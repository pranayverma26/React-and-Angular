export interface SessionData {
  ClientId: number,
WidgetId: number,
TrainingFloId: number,
CourseId: number,
WidgetTypeId:number,
WidgetTypeName:string,
RespondedUserId: number,
CourseRatingId: number,
AcknowledgementCount: number,
EncouragementCount: number,
FeedbackCount: number,
CourseRatingTypeOptions: [],
CourseRatingResponses: [],
AddFeedbackModel: {},
CourseList: null,
LoggedInUser: null
}


export interface CourseResponse{
CourseRatingTypeOptionId: number,
CourseRatingId: number,
CourseRatingTypeId: number,
CourseRatingTitle: string,
CourseRatingType: string,
CourseRatingImage: string,
IsAcknowledgement: boolean,
CourseRatingCssClass: string,
UserProfileImage:string,
UserFirstName:string,
UserLastName:string,
Comment:string,
CreatedOn:string,
allowEdit:boolean,
showEditBox:boolean,
WidgetId:number,
CourseRatingResponseId:number

}
