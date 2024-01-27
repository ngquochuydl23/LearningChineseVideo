namespace LearningVideoApi.Dtos.Video
{
    public class SubtitleDto
    {
        public string Url { get; set; }

        public string SrcLang { get; set; } = "zh";

        public bool IsDefault { get; set; } = false;
    }
}
