import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconsProviderModule } from './icons-provider.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [],
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    NzTabsModule,
    NzSpinModule,
    NzDescriptionsModule,
    NzMessageModule,
    NzUploadModule,
    IconsProviderModule,
    NzResultModule,
    NzDatePickerModule,
    NzGridModule,
    NzTransferModule,
    NzDropDownModule,
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    NzTabsModule,
    NzSpinModule,
    NzDescriptionsModule,
    NzMessageModule,
    NzUploadModule,
    IconsProviderModule,
    NzResultModule,
    NzAlertModule,
    NzDatePickerModule,
    NzGridModule,
    NzTransferModule,
    NzDropDownModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgZorroModule {}
