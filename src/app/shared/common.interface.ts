export interface IComponentData {
  ClientId: string;
  CourseId: number;
  MetadataModel: any[];
  SessionWidgets: ISessionWidgets[];
  TrainingFloCommunityId: number;
  TrainingFloId: number;
  UserId: number,
  UserName: string,
  IspostcommunityEnabled: boolean
}

export interface ISessionWidgets {
  TrainingFloCommunityId: number;
  TrainingFloId: number;
  TrainingFloWidgetId: number;
  WidgetId: number;
  WidgetTypeId: number;
  WidgetTypeName: string;
}
