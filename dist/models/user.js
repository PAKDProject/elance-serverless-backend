"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const job_1 = require("./job");
/**
 * Class for Skills
 */
class Skill {
}
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], Skill.prototype, "title", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], Skill.prototype, "description", void 0);
exports.Skill = Skill;
/**
 * Class for Education Items
 */
class EducationItem {
}
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], EducationItem.prototype, "degreeTitle", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], EducationItem.prototype, "startYear", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], EducationItem.prototype, "endYear", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], EducationItem.prototype, "collegeName", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], EducationItem.prototype, "grade", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], EducationItem.prototype, "description", void 0);
exports.EducationItem = EducationItem;
/**
 * Class for Social Links
 */
class SocialLink {
}
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], SocialLink.prototype, "name", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], SocialLink.prototype, "linkUrl", void 0);
exports.SocialLink = SocialLink;
/**
* Model class for User
* @extends AWS-SDK
*/
let User = User_1 = class User {
    constructor(email, fName, lName, dob, summary, skills, educationItems, activeJobs, jobHistory, avatarUrl, backgroundUrl, socialLinks, tagline, contacts) {
        this.email = email;
        this.fName = fName;
        this.lName = lName;
        this.dob = dob;
        this.summary = summary;
        this.skills = skills;
        this.educationItems = educationItems;
        this.activeJobs = activeJobs;
        this.jobHistory = jobHistory;
        this.avatarUrl = avatarUrl;
        this.backgroundUrl = backgroundUrl;
        this.socialLinks = socialLinks;
        this.tagline = tagline;
        this.contacts = contacts;
    }
};
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "fName", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "lName", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", Date)
], User.prototype, "dob", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "summary", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute({ memberType: dynamodb_data_mapper_1.embed(Skill) }),
    __metadata("design:type", Array)
], User.prototype, "skills", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute({ memberType: dynamodb_data_mapper_1.embed(EducationItem) }),
    __metadata("design:type", Array)
], User.prototype, "educationItems", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute({ memberType: dynamodb_data_mapper_1.embed(job_1.Job) }),
    __metadata("design:type", Array)
], User.prototype, "activeJobs", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute({ memberType: dynamodb_data_mapper_1.embed(job_1.Job) }),
    __metadata("design:type", Array)
], User.prototype, "jobHistory", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "backgroundUrl", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute({ memberType: dynamodb_data_mapper_1.embed(SocialLink) }),
    __metadata("design:type", Array)
], User.prototype, "socialLinks", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "tagline", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute({ memberType: dynamodb_data_mapper_1.embed(User_1) }),
    __metadata("design:type", Array)
], User.prototype, "contacts", void 0);
User = User_1 = __decorate([
    dynamodb_data_mapper_annotations_1.table('users'),
    __metadata("design:paramtypes", [String, String, String, Date, String, Array, Array, Array, Array, String, String, Array, String, Array])
], User);
exports.User = User;
//# sourceMappingURL=user.js.map