import React, { Component } from "react";
import { Form, Button, Select, Checkbox, Input, Radio, DatePicker, Row, Col } from 'antd';
import moment from 'moment'
import * as utils from '../../utils'

class VisaDatePicker extends Component {
  static defaultProps = {
    extra: "",
    label: "",
    required: true,
    customRules: null
  }
  render() {

    const { label, extra, initialValue, field, getFieldDecorator, required, customRule, ...rest } = this.props
    return (
      <Form.Item label={label} extra={extra} required={required}>
        {getFieldDecorator(field, {
          initialValue: moment(utils.getInitialValue(initialValue)),
          rules: customRule ? customRule : [{ required: required, message: 'This field is required' }],
        })(
          <DatePicker />
        )}
      </Form.Item>
    );
  }
}
export default VisaDatePicker;