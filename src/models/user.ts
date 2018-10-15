import { attribute, table } from "@aws/dynamodb-data-mapper-annotations"
import { embed, DataMapper } from "@aws/dynamodb-data-mapper"
import { Job } from "./job"
import DynamoDB = require('aws-sdk/clients/dynamodb')
const client = new DynamoDB({region: 'eu-west-1'})
const mapper = new DataMapper({client})

/**
 * Class for Skills
 */
export class Skill {
    @attribute()
    title?: string

    @attribute()
    description?: string
}

/**
 * Class for Education Items
 */
export class EducationItem {
    @attribute()
    degreeTitle?: string

    @attribute()
    startYear?: string

    @attribute()
    endYear?: string

    @attribute()
    collegeName?: string

    @attribute()
    grade?: string

    @attribute()
    description?: string
}

/**
 * Class for Social Links
 */
export class SocialLink {
    @attribute()
    name?: string

    @attribute()
    linkUrl?: string
}

/**
* Model class for User
* @extends AWS-SDK
*/
@table('users')
export class User{

    @attribute()
    email?: string

    @attribute()
    fName?: string

    @attribute()
    lName?: string

    @attribute()
    dob?: Date

    @attribute()
    summary?: string

    @attribute({memberType: embed(Skill)})
    skills?: Array<Skill>

    @attribute({memberType: embed(EducationItem)})
    educationItems?: Array<EducationItem>

    @attribute({memberType: embed(Job)})
    activeJobs?: Array<Job>

    @attribute({memberType: embed(Job)})
    jobHistory?: Array<Job>

    @attribute()
    avatarUrl?: string

    @attribute()
    backgroundUrl?: string

    @attribute({memberType: embed(SocialLink)})
    socialLinks?: Array<SocialLink>

    @attribute()
    tagline?: string

    @attribute({memberType: embed(User)})
    contacts?: Array<User>

    constructor(email?: string, fName?: string, lName?: string, dob?: Date, summary?: string, skills?: Skill[], educationItems?: EducationItem[], activeJobs?: Job[], jobHistory?: Job[], avatarUrl?: string, backgroundUrl?: string, socialLinks?: SocialLink[], tagline?: string, contacts?: User[]) {
        this.email = email
        this.fName = fName
        this.lName = lName
        this.dob = dob
        this.summary = summary
        this.skills = skills
        this.educationItems = educationItems
        this.activeJobs = activeJobs
        this.jobHistory = jobHistory
        this.avatarUrl = avatarUrl
        this.backgroundUrl = backgroundUrl
        this.socialLinks = socialLinks
        this.tagline = tagline
        this.contacts = contacts
    }
    /**
    * Default method for finding all Users
    * @param this - context
    */
    async findAllUsers(this: User) {
        let userArray = Array<User>()
        for await (const user of mapper.scan({valueConstructor: User})){
            userArray.push(user)
        }
        return userArray
    }

    // // Find a user based on the name given
    // static async findUserByName(this: ModelType<User>, name: string) {
    //     return await this.findOne({ name: name })
    // }

    // // Find a user based on the ID given
    // static async findUserById(this: ModelType<User>, id: string) {
    //     let o_id = new ObjectId(id)
    //     return await this.findOne({ _id: o_id })
    // }

    // // Query the user collection
    // static async findUsersByQuery(this: ModelType<User>, query: object) {
    //     return await this.find(query)
    // }

    // // Delete a user based on the ID given
    // static async deleteUserById(this: ModelType<User>, id: string) {
    //     let o_id = new ObjectId(id)
    //     return await this.deleteOne({ _id: o_id })
    // }

}
export const UserModel = new User()

