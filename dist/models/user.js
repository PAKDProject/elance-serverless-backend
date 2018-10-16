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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const job_1 = require("./job");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const client = new DynamoDB({ region: 'eu-west-1' });
const mapper = new dynamodb_data_mapper_1.DataMapper({ client });
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
    /**
    * Default method for finding all Users
    * @param this - context
    */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            let userArray = Array();
            try {
                for (var _b = __asyncValues(mapper.scan({ valueConstructor: User_1 })), _c; _c = yield _b.next(), !_c.done;) {
                    const user = _c.value;
                    userArray.push(user);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return userArray;
        });
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
exports.UserModel = new User();
//# sourceMappingURL=user.js.map