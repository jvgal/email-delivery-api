import { Types } from 'mongoose';
import { FormLabels, FormMaterial } from 'src/components/forms/schemas/form.schema';

export interface IFormHome {
  campaign: {
    _id: Types.ObjectId;
    title: string;
  };
  category?: {
    _id: Types.ObjectId;
    title: string;
  };
  introduction: string;
  material?: FormMaterial;
  labels: FormLabels;
}
