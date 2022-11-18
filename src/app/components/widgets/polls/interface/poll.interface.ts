export interface IPollTheme {
  barColor: string;
  submitButtonColor: string;
}

export interface IPollWidget {
  widgetId: number;
  flowId: number;
  clientId: number;
}

export interface PollData{

Question: string,
PollId: number,
TrainingFloId: number,
WidgetId: number,
IsPreCommunityPoll: number,
PollOptions: null,
selectedPollId:any;
disabled:any;
PollsResponses:any[]
}


 export interface PollResponse{
PollResponseId: number,
PollId: number,
PollOptionId: number,
UserId: number,
UserFirstName: string,
UserLastName: string,
UserProfileImage: string
 }
