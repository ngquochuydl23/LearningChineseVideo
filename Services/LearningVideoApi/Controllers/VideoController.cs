using AutoMapper;
using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Infrastructure.Entities.Topics;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Exceptions;
using LearningVideoApi.Infrastructure.Seedworks;
using LearningVideoApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepository<VideoEntity> _videoRepo;
        private readonly IRepository<TopicEntity> _topicRepo;
        private readonly IUnitOfWork _unitOfWork;

        public VideoController(
            IMapper mapper,
            IRepository<VideoEntity> videoRepo,
            IRepository<TopicEntity> topicRepo,
            IHttpContextAccessor httpContextAccessor,
            IUnitOfWork unitOfWork) : base(httpContextAccessor)
        {
            _mapper = mapper;
            _videoRepo = videoRepo;
            _topicRepo = topicRepo;
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public IActionResult Get(
            [FromQuery] FromQueryAsCollection query,
            [FromQuery] string? topic,
            [FromQuery] string? level,
            [FromQuery] string? search)
        {
            var videos = _videoRepo
                .GetQueryableNoTracking()
                .Include(x => x.TopicVideos)
                .ThenInclude(topicVideo => topicVideo.Topic)
                .Where(x => !x.IsDeleted)
                .Where(x => !string.IsNullOrEmpty(level) 
                    ? (x.Level.Equals(level)) 
                    : true)
                .Where(p => !string.IsNullOrEmpty(search) 
                    ? p.SearchVector.Matches(EF.Functions.ToTsQuery(search + ":*")) 
                    : true);

            if (query.Offset.HasValue && query.Limit.HasValue)
            {
                videos = videos
                    .Skip(query.Offset.Value)
                    .Take(query.Limit.Value);
            }

            return Ok(_mapper.Map<ICollection<VideoDto>>(videos.ToList()));
        }


        [HttpGet("{id}")]
        public IActionResult GetVideo(string id)
        {
            var video = _videoRepo
                .GetQueryableNoTracking()
                .Include(x => x.TopicVideos)
                .ThenInclude(topicVideo => topicVideo.Topic)
                .FirstOrDefault(x => x.Id.Equals(id) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            return Ok(_mapper.Map<VideoDto>(video));
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddVideo([FromBody] CreateVideoDto value)
        {
            if (_videoRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Title.Equals(value.Title) && !x.IsDeleted) != null)
            {
                throw new AppException("Video is already created");
            }

            using (_unitOfWork.Begin())
            {
                var video = _videoRepo.Insert(new VideoEntity(
                    value.Title,
                    value.Description,
                    value.VideoUrl,
                    value.Thumbnail,
                    value.MimeType,
                    value.Duration,
                    value.Level));

                

                video.Subtitles = value.Subtitles.Select(subtitle =>
                    new VideoSubtitleEntity(
                        video.Id,
                        subtitle.Url,
                        subtitle.SrcLang,
                        subtitle.IsDefault))
                    .ToList();

                video.PlainTextWithTopic = string.Join(",", value.Topics);
                video.TopicVideos = value.Topics.Select(topic =>
                        AddTopicToVideo(video, topic))
                    .ToList();

                _videoRepo.SaveChanges();
                _unitOfWork.Complete();

                return Ok(_mapper.Map<VideoDto>(video));
            }
        }

        [HttpPut("{id}")]
        public void EditVideoInfo(string id, [FromBody] string value)
        {

        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var video = _videoRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Id.Equals(id) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            _videoRepo.Delete(video);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("mostPopular")]
        public IActionResult GetMostPopular([FromQuery] FromQueryAsCollection query)
        {
            var videos = _videoRepo
                .GetQueryableNoTracking()
                .Where(x => !x.IsDeleted)
                .OrderByDescending(x => x.ViewerCount)
                .ToList();

            return Ok(_mapper.Map<ICollection<VideoDto>>(videos));
        }

        [AllowAnonymous]
        [HttpGet("recentlyAdded")]
        public IActionResult GetRecentlyAdded([FromQuery] FromQueryAsCollection query)
        {
            var videos = _videoRepo
                .GetQueryableNoTracking()
                .Where(x => !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAt)
                .ToList();

            return Ok(_mapper.Map<ICollection<VideoDto>>(videos));
        }

        [HttpPost("{id}/view")]
        public IActionResult ViewVideo(string id)
        {
            var video = _videoRepo
                .GetQueryable()
                .FirstOrDefault(x => x.Id.Equals(id) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            video.ViewerCount++;
            _videoRepo.SaveChanges();

            return Ok();
        }

        private TopicVideoEntity AddTopicToVideo(VideoEntity video, string topicTitle)
        {
            var topic = _topicRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Title.Equals(topicTitle) && !x.IsDeleted);

            if (topic == null)
            {
                return new TopicVideoEntity(video.Id, new TopicEntity(topicTitle));
            }

            var topicVideo = video.TopicVideos
                .FirstOrDefault(x => x.TopicId.Equals(topic.Id) && x.VideoId.Equals(video.Id) && !x.Video.IsDeleted);

            if (topicVideo != null)
            {
                throw new AppException("This topic is already in video");
            }

            return new TopicVideoEntity(video.Id, topic.Id);
        }
    }
}
