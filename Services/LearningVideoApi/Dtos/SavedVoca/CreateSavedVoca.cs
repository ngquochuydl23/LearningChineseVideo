namespace LearningVideoApi.Dtos.SavedVoca
{
    public class CreateSavedVoca
    {
        public string VideoId { get; set; }

        public string VocabularyId { get; set; }


        public DateTime ShowedAt { get; set; }
    }
}
