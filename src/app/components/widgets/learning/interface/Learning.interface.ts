export interface LearningData {
ClientId: number,
SubWidgetId: number,
WhatsHappeningWidgetId:number,
WidgetId: number,
WidgetTypeId: number,
TotalCount: number,
UserId: number,
KeyTakeaways: [],
LearningApplieds: null,
News: [],
UpcomingTrainings: [],
DiscussionQuestions: [],
WhathappingAllModels: [],
showCurrentSessionData: boolean,
LoggedInUser: {}

}
 export interface DiscussionData{
  DiscussionQuestionId: number,
WidgetId: number,
Question: string,
DiscussionQuestionResponseId:number
// DiscussionQuestionId: 247,
DiscussionQuestionResponses:[]
UserId:number,
Response: string,
FirstName: string,
LastName:string,
UserProfileImage: string,
AcknowledgementCount: number,
EncouragementCount: number,
CreatedOn:string,
response:[]
}
