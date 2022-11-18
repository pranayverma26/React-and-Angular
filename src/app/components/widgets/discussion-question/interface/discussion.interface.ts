export interface DiscussionQues {
 WidgetId?: number,
TrainingFloId?:number,
Question:string,
isResponded:boolean,
response:any,
DiscussionQuestions?: any[],
DiscussionQuestionResponses?:any[]
DiscussionQuestionResponseId:number
}
 export interface DQ{
  id: number,
  Question:string
 }


 export interface DiscussionQuestionResponses{
id:number,
comment:string
 }
