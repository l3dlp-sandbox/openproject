import { fakeAsync, flush, tick } from '@angular/core/testing';
import {
  createDynamicInputFixture,
} from "core-app/modules/common/dynamic-forms/spec/helpers";
import { By } from "@angular/platform-browser";
// @ts-ignore
import(/* webpackChunkName: "ckeditor" */ 'core-vendor/ckeditor/ckeditor.js');

fdescribe('FormattableTextareaInputComponent', () => {
  it('should load the field', fakeAsync(() => {
    const fieldsConfig = [
      {
        "type": "formattableInput" as "formattableInput",
        "className": "op-form--field inline-edit--field",
        "key": "testControl",
        "templateOptions": {
          "required": true,
          "label": "testControl",
          "type": "text",
          "placeholder": "",
          "disabled": false,
          "bindLabel": 'name',
          "bindValue": 'value',
          "noWrapLabel": true
        },
      }
    ];
    const formModel = {
      testControl: {
        html: '<p>tesValue</p>',
        raw: 'tesValue'
      },
    };
    const testModel = {
      initialValue: formModel.testControl,
      changedValue: 'testValue2',
    };
    const fixture = createDynamicInputFixture(fieldsConfig, formModel);
    const dynamicInput = fixture.debugElement.query(By.css('.document-editor__editable-container')).nativeElement;
    const dynamicControl = fixture.componentInstance.dynamicControl.field.formControl;
    const dynamicDebugElement = fixture.debugElement.query(By.css('op-formattable-control'));
    const dynamicElement = dynamicDebugElement.nativeElement;

    // Test ControlValueAccessor
    // Write Value
    expect(dynamicControl.value).toEqual(testModel.initialValue);
    expect(dynamicElement.classList.contains('ng-untouched')).toBeTrue();
    expect(dynamicElement.classList.contains('ng-valid')).toBeTrue();
    expect(dynamicElement.classList.contains('ng-pristine')).toBeTrue();
  }));
});

