import { Types } from 'mongoose';

export type CampaignHomeBlockReason = 'publishingLimitReached' | 'invalidPublishingPeriod' | null;

export interface ICampaignHome {
  _id: Types.ObjectId;
  title: string;
  thumbPath: string;
  allowedToPublish: boolean;
  reason: CampaignHomeBlockReason;
  allowedToEdit: boolean;
  allowSocialInteraction: boolean;
}
