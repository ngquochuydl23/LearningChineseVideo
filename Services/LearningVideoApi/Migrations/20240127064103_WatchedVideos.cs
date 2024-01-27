using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LearningVideoApi.Migrations
{
    /// <inheritdoc />
    public partial class WatchedVideos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyFavouriteEntity_User_UserId",
                table: "MyFavouriteEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MyFavouriteEntity_Video_VideoId",
                table: "MyFavouriteEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MyFavouriteEntity",
                table: "MyFavouriteEntity");

            migrationBuilder.RenameTable(
                name: "MyFavouriteEntity",
                newName: "MyFavourite");

            migrationBuilder.RenameIndex(
                name: "IX_MyFavouriteEntity_VideoId",
                table: "MyFavourite",
                newName: "IX_MyFavourite_VideoId");

            migrationBuilder.RenameIndex(
                name: "IX_MyFavouriteEntity_UserId",
                table: "MyFavourite",
                newName: "IX_MyFavourite_UserId");

            migrationBuilder.AddColumn<long>(
                name: "Duration",
                table: "Video",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MyFavourite",
                table: "MyFavourite",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "WatchedVideo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    VideoId = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WatchedVideo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WatchedVideo_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WatchedVideo_Video_VideoId",
                        column: x => x.VideoId,
                        principalTable: "Video",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WatchedVideo_UserId",
                table: "WatchedVideo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WatchedVideo_VideoId",
                table: "WatchedVideo",
                column: "VideoId");

            migrationBuilder.AddForeignKey(
                name: "FK_MyFavourite_User_UserId",
                table: "MyFavourite",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MyFavourite_Video_VideoId",
                table: "MyFavourite",
                column: "VideoId",
                principalTable: "Video",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyFavourite_User_UserId",
                table: "MyFavourite");

            migrationBuilder.DropForeignKey(
                name: "FK_MyFavourite_Video_VideoId",
                table: "MyFavourite");

            migrationBuilder.DropTable(
                name: "WatchedVideo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MyFavourite",
                table: "MyFavourite");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Video");

            migrationBuilder.RenameTable(
                name: "MyFavourite",
                newName: "MyFavouriteEntity");

            migrationBuilder.RenameIndex(
                name: "IX_MyFavourite_VideoId",
                table: "MyFavouriteEntity",
                newName: "IX_MyFavouriteEntity_VideoId");

            migrationBuilder.RenameIndex(
                name: "IX_MyFavourite_UserId",
                table: "MyFavouriteEntity",
                newName: "IX_MyFavouriteEntity_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MyFavouriteEntity",
                table: "MyFavouriteEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MyFavouriteEntity_User_UserId",
                table: "MyFavouriteEntity",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MyFavouriteEntity_Video_VideoId",
                table: "MyFavouriteEntity",
                column: "VideoId",
                principalTable: "Video",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
