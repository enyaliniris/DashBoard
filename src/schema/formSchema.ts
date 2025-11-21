export type FieldType = 'input' | 'switch' | 'checkbox' | 'radio' | 'textarea';

export interface FieldOption {
  label: string;
  value: string;
}

export type Validator<T = any> = (value: T, formState?: Record<string, any>) => true | string;

export interface Rule<T = any> {
  validator: Validator<T>;   // 驗證函式
  trigger?: 'change' | 'blur'; // 觸發時機，可選
}

export interface FieldSchema {
  field: string;          // formState 的 key
  label: string;          // 顯示名稱
  type: FieldType;        // 控件種類
  options?: FieldOption[]; // checkbox / radio 選項
  col?: { label?: any; wrapper?: any }; // labelCol / wrapperCol
  rules?: Rule[];             // 驗證規則
}

export const formSchema = [
  { field: 'name', label: 'Activity name', type: 'input', default: '',
    rules: [
      {
        validator: (value: string) => {
          // 台灣身分證驗證
          const regex = /^[A-Z][12]\d{8}$/;
          if (!regex.test(value)) return '請輸入有效的台灣身分證號';
          return true;
        }
      }
    ]
   },
  { field: 'delivery', label: 'Instant delivery', type: 'switch', default: false },
  {
    field: 'type', label: 'Activity type', type: 'checkbox', options: [
      { label: 'Online', value: '1' },
      { label: 'Promotion', value: '2' },
      { label: 'Offline', value: '3' }
    ], default: []
  },
  {
    field: 'resource', label: 'Resources', type: 'radio', options: [
      { label: 'Sponsor', value: '1' },
      { label: 'Venue', value: '2' }
    ], default: ''
  },
  { field: 'desc', label: 'Activity form', type: 'textarea', default: '' },
];

