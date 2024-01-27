using FluentValidation;
using LearningVideoApi.Dtos;
using static System.Net.Mime.MediaTypeNames;

namespace LearningVideoApi.Validators
{
    public class SignUpRequestValidator : AbstractValidator<SignUpRequestDto>
    {
        public SignUpRequestValidator()
        {
            RuleFor(x => ConvertToUnsign(x.FullName))
                .NotEmpty()
                .Matches(@"(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})")
                .WithMessage("Full name must not be empty");

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Email is invalid");

            RuleFor(x => x.Password)
                .NotEmpty()
                .Length(7, 12)
                .WithMessage("Password must be from 7 to 12");

            RuleFor(x => x.Gender)
                 .NotNull()
                 .Must(x => (new List<int>() { 0, 1 }).Contains(x))
                 .WithMessage("Gender must be 0 or 1");

            RuleFor(s => s.Birthday)
                .NotNull()
                .Must(ValidateBirthday)
                .WithMessage("Your age must greater than 3");

            RuleFor(x => x.Level)
                .NotEmpty()
                .WithMessage("Level must not be empty");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty()
                .Length(10)
                .Matches(@"^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$");
        }


        private bool ValidateBirthday(DateTime birthday)
        {
            int currentYear = DateTime.Now.Year;
            return currentYear - birthday.Year > 3;
        }

        private string ConvertToUnsign(string text)
        {
            string[] arr1 = new string[] { "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
                "đ",
                "é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ",
                "í","ì","ỉ","ĩ","ị",
                "ó","ò","ỏ","õ","ọ","ô","ố","ồ","ổ","ỗ","ộ","ơ","ớ","ờ","ở","ỡ","ợ",
                "ú","ù","ủ","ũ","ụ","ư","ứ","ừ","ử","ữ","ự",
                "ý","ỳ","ỷ","ỹ","ỵ",};
            string[] arr2 = new string[] { "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
                "d",
                "e","e","e","e","e","e","e","e","e","e","e",
                "i","i","i","i","i",
                "o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o",
                "u","u","u","u","u","u","u","u","u","u","u",
                "y","y","y","y","y",};
            for (int i = 0; i < arr1.Length; i++)
            {
                text = text.Replace(arr1[i], arr2[i]);
                text = text.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }
            return text;
        }
    }
}
