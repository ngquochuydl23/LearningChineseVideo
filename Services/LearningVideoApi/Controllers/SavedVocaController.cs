using AutoMapper;
using LearningVideoApi.Dtos.SavedVoca;
using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Extensions.JwtHelpers;
using LearningVideoApi.Infrastructure.Entities.SavedVocabularies;
using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Entities.Vocabularies;
using LearningVideoApi.Infrastructure.Exceptions;
using LearningVideoApi.Infrastructure.Seedworks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedVocaController : BaseController
    {
        private readonly IJwtExtension _jwtExtension;
        private readonly IRepository<SavedVocaEntity> _savedVocaRepo;
        private readonly IRepository<VideoEntity> _videoRepo;
        private readonly IRepository<VocabularyEntity> _vocaRepo;
        private readonly IMapper _mapper;

        public SavedVocaController(
            IMapper mapper,
            IRepository<SavedVocaEntity> savedVocaRepo,
            IRepository<VideoEntity> videoRepo,
            IRepository<VocabularyEntity> vocaRepo,
            IHttpContextAccessor httpContextAccessor,
            IJwtExtension jwtExtension) : base(httpContextAccessor)
        {
            _mapper = mapper;
            _savedVocaRepo = savedVocaRepo;
            _jwtExtension = jwtExtension;
            _videoRepo = videoRepo;
            _vocaRepo = vocaRepo;
        }

        [Authorize]
        [HttpGet("GetSavedByVideo")]
        public IActionResult GetSavedByVideo()
        {

            var savedVocabularyAsVideo = _savedVocaRepo
                .GetQueryableNoTracking()
                .Where(x => x.UserId == Id)
                .Include(x => x.Video)
                .ThenInclude(video => video.TopicVideos)
                .OrderByDescending(x => x.CreatedAt)
                .GroupBy(x => x.Video)
                .Select(x => new
                {
                    Video = x.Key,
                    LastUpdated = x.First().CreatedAt,
                    SavedCount = x.Count()
                })
                .OrderByDescending(x => x.LastUpdated)
                .ToList();


            return Ok(savedVocabularyAsVideo);
        }


        [Authorize]
        [HttpPost]
        public IActionResult SaveVoca([FromBody] CreateSavedVoca value)
        {

            var video = _videoRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.Id.Equals(value.VideoId))
                    ?? throw new AppException("Video not found");

            var voca = _vocaRepo
                .GetQueryableNoTracking()
                .FirstOrDefault(x => x.OriginWord.Equals(value.VocabularyId))
                    ?? throw new AppException("Vocabulary not found");

            var savedVoca = _savedVocaRepo.Insert(new SavedVocaEntity(Id, video.Id, voca.OriginWord, value.ShowedAtDuration));
            return Ok(_mapper.Map<SavedVocaDto>(savedVoca));
        }
    }
}
