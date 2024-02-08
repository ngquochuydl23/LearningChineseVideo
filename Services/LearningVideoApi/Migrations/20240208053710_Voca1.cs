using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class Voca1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vocabulary",
                columns: table => new
                {
                    OriginWord = table.Column<string>(type: "text", nullable: false),
                    VietnameseMean = table.Column<string>(type: "text", nullable: true),
                    WordType = table.Column<string>(type: "text", nullable: true),
                    Pinyin = table.Column<string>(type: "text", nullable: true),
                    SimiliarMeaning = table.Column<string>(type: "text", nullable: true),
                    OppositeMeaning = table.Column<string>(type: "text", nullable: true),
                    Example = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vocabulary", x => x.OriginWord);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vocabulary");
        }
    }
}
