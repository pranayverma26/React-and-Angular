export interface TrainingTheme {
  barColor:string;

}

export interface TrainingData{
  id: number,
  typeid: number,
  heading: string,
  para: string,
  videoUrl: string,
  HTMLContentId:number
Title:string
Description:string
comments:any
  // TODO: Create enums in place of hard coded numbers.
  sanitizedURL:any,
  ResourceId:number,
  RecordingId:number,
  URL:string
  ResourceTypes:any,
  ResourceTypeId:number,

  Name:string
  SessionRecordings:[],
  Resources:[]


}
export interface ResourceType{
  ResourceTypeId: number,
ResourceType:string,
ResourceCount: number,
ResourceClassName: null,
TrainingFloId: number
}
