using AutoMapper;
using LearningVideoApi.Dtos.MyFavourite;
using LearningVideoApi.Infrastructure.Entities.Likes;
using LearningVideoApi.Infrastructure.Entities.Topics;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Exceptions;
using LearningVideoApi.Infrastructure.Seedworks;
using LearningVideoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace LearningVideoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepository<VideoEntity> _videoRepo;
        private readonly IRepository<LikeEntity> _likeRepo;
        private readonly IUnitOfWork _unitOfWork;

        public LikeController(
            IMapper mapper,
            IRepository<VideoEntity> videoRepo,
            IRepository<LikeEntity> likeRepo,
            IHttpContextAccessor httpContextAccessor,
            IUnitOfWork unitOfWork) : base(httpContextAccessor)
        {
            _mapper = mapper;
            _videoRepo = videoRepo;
            _likeRepo = likeRepo;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetLikes([FromQuery] FromQueryAsCollection query)
        {
            var likes = _likeRepo
                .GetQueryableNoTracking()
                .Include(x => x.Video)
                .Where(x => !x.IsDeleted)
                .ToList();

            return Ok(_mapper.Map<ICollection<LikeDto>>(likes));
        }

        [HttpPost]
        public IActionResult CreateLike([FromBody] CreateLikeDto value)
        {
            var video = _videoRepo
                .GetQueryable()
                .Include(x => x.Likes)
                .FirstOrDefault(x => x.Id.Equals(value.VideoId) && !x.IsDeleted)
                    ?? throw new AppException("Video does not exist");

            if (video.Likes.FirstOrDefault(x => x.UserId == Id && !x.IsDeleted) != null) 
            {
                throw new AppException("You already liked this video");
            }

            var like = new LikeEntity(Id, video.Id);

            video.Likes.Add(like);
            video.LastUpdated = DateTime.Now;


            _videoRepo.SaveChanges();
            UpdateLikeCount(video.Id);
            return Ok(_mapper.Map<LikeDto>(like));
        }


        [HttpDelete("{id}")]
        public IActionResult RemoveLike(long id)
        {
            var likeVideo = _likeRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Id == id && !x.IsDeleted)
                    ?? throw new AppException("You did not like this video");

            _likeRepo.Delete(likeVideo);
            UpdateLikeCount(likeVideo.VideoId);
            return Ok();
        }

        private void UpdateLikeCount(string videoId)
        {
            var likeCount = _likeRepo
                .GetQueryableNoTracking()
                .Where(x => !x.IsDeleted)
                .Where(x => x.VideoId.Equals(videoId))
                .LongCount();

            var video = _videoRepo
                .GetQueryable()
                .FirstOrDefault(x => x.Id.Equals(videoId) && !x.IsDeleted);

            video.LikeCount = likeCount;
            _videoRepo.SaveChanges();
        }
    }
}
