export interface CommunityType {
  HeaderDomainModel:any,
  SessionName: string,
 TrainingFloId: number,
 EngagementUsersModel: [],
 CommunityType: string,
 CommunityDateTime: string,
 StartDateTime: string,
EndDateTime: string
}
 export interface CommunityData{
  showPostCommunity: boolean,
  preCommunity?: CommunityType,
  postCommunity?: CommunityType,
 }
