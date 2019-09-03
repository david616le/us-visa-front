import React, { Component } from "react";
import { Form, Button, Select, Checkbox, Input, Radio, DatePicker, Row, Col } from 'antd';
import * as constants from '../../../../utils/constants'
import VisaSelect from "../../../../components/VisaSelect";
import moment from 'moment'
import VisaRadio from "../../../../components/VisaRadio";
import VisaExplain from "../../../../components/VisaExplain";
import VisaDateLength from "../../../../components/VisaDateLength";
import VisaAddress from "../../../../components/VisaAddress";
import VisaInput from "../../../../components/VisaInput";
import VisaSelectItem from "../../../../components/VisaSelectItem";
import VisaDatePicker from "../../../../components/VisaDatePicker";
import * as utils from '../../../../utils'

const { Option } = Select;
const { TextArea } = Input;

class MyForm extends Component {
  static defaultProps = {
    showPrev: true,
    showNext: true,
  }
  handlePrev = e => {
    e.preventDefault();
    const values = this.props.form.getFieldsValue();

    this.props.onPrev(values.data)
  }
  handleSave = e => {
    e.preventDefault();
    const values = this.props.form.getFieldsValue();
    this.props.onSaveAndContinue(values.data)
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onNext(values.data);
      }
    });
  };

  render() {
    const { getFieldDecorator, isFieldTouched } = this.props.form;
    const formItemLayout = {
      layout: 'vertical',
      labelCol: {
        xs: { span: 24 },
      },
      wrapperCol: {
        sm: { span: 24 },
      },
    };

    const { martial_status_options } = constants

    const { showPrev, showNext, onPrev, onNext, data, date_birth } = this.props

    getFieldDecorator('data.father.b_in_US', { initialValue: utils.getInitialValue(data.father.b_in_US) });
    getFieldDecorator('data.mother.b_in_US', { initialValue: utils.getInitialValue(data.mother.b_in_US) });
    getFieldDecorator('data.b_other_relative', { initialValue: utils.getInitialValue(data.b_other_relative) });
    getFieldDecorator('data.b_more_relatives', { initialValue: utils.getInitialValue(data.b_more_relatives) });
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <div className="visa-global-field visa-global-border-bottom">
          <h2 className="visa-global-section-title">Family Information : Your Parents</h2>
        </div>

        <Form.Item label="List your Father's information here" required>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <VisaInput
                label="Father's First Name"
                extra="Leave blank if you do not know"
                field="data.father.surname"
                initialValue={data.father.surname}
                getFieldDecorator={getFieldDecorator}
                customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Surname") }]}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <VisaInput
                label="Father's Last Name"
                extra="Leave blank if you do not know"
                field="data.father.given_name"
                initialValue={data.father.given_name}
                getFieldDecorator={getFieldDecorator}
                customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Given Name") }]}
              />
            </Col>
          </Row>
          <VisaDatePicker 
            label="Father's date of birth (If known)"
            extra="Please enter the Date Format as Day/Month/Year For example January 12 2013 enter 12/01/2013"
            field="data.father.birthday"
            initialValue={data.father.birthday}
            getFieldDecorator={getFieldDecorator}
            required={false}
            customRule={[{ validator: (rule, value, callback) => this.props.validators.validateParentBirthDate(rule, value, callback, "Father's date of birth", date_birth) }]}
          />
          <VisaRadio
            label="Is your Father in the US?"
            field="data.father.b_in_US"
            initialValue={data.father.b_in_US}
            getFieldDecorator={getFieldDecorator}
          />
          {
            this.props.form.getFieldValue('data.father.b_in_US') &&
            <VisaSelectItem
              label="Father's Status"
              field="data.father.status"
              initialValue={data.father.status}
              content={{
                combines: constants.export_list(constants.US_Live_Status)
              }}
              getFieldDecorator={getFieldDecorator}
            />
          }
        </Form.Item>

        <Form.Item label="List your Mother's information here" required>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <VisaInput
                label="Mother's First Name"
                extra="Leave blank if you do not know"
                field="data.mother.surname"
                initialValue={data.mother.surname}
                getFieldDecorator={getFieldDecorator}
                customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Surname") }]}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <VisaInput
                label="Mother's Last Name"
                extra="Leave blank if you do not know"
                field="data.mother.given_name"
                initialValue={data.mother.given_name}
                getFieldDecorator={getFieldDecorator}
                customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Given Name") }]}
              />
            </Col>
          </Row>
          <VisaDatePicker 
            label="Mother's date of birth (If known)"
            extra="Please enter the Date Format as Day/Month/Year For example January 12 2013 enter 12/01/2013"
            field="data.mother.birthday"
            initialValue={data.mother.birthday}
            getFieldDecorator={getFieldDecorator}
            required={false}
            customRule={[{ validator: (rule, value, callback) => this.props.validators.validateParentBirthDate(rule, value, callback, "Mother's date of birth", date_birth) }]}
          />
          <VisaRadio
            label="Is your Mother in the US?"
            field="data.mother.b_in_US"
            initialValue={data.mother.b_in_US}
            getFieldDecorator={getFieldDecorator}
          />
          {
            this.props.form.getFieldValue('data.mother.b_in_US') &&
            <VisaSelectItem
              label="Mother's Status"
              field="data.mother.status"
              initialValue={data.mother.status}
              content={{
                combines: constants.export_list(constants.US_Live_Status)
              }}
              getFieldDecorator={getFieldDecorator}
            />
          }
        </Form.Item>

        <div className="visa-global-field visa-global-border-bottom">
          <h2 className="visa-global-section-title">Family information : Your Relatives</h2>
        </div>

        <VisaRadio
          label="Do you have any immediate relatives other than parents living in the United States?"
          extra="Means fiancé/fiancée, spouse (husband/wife), child (son/daughter) or sibling (brother/sister)"
          field="data.b_other_relative"
          initialValue={data.b_other_relative}
          getFieldDecorator={getFieldDecorator}
        />

        {   
          this.props.form.getFieldValue('data.b_other_relative') &&
          <Form.Item label="Enter Full Name, Relationship to you, Immigration Status">
            <Row gutter={16}>
              <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
                <VisaInput
                  label="First Name"
                  field="data.other.surname"
                  initialValue={data.other.surname}
                  getFieldDecorator={getFieldDecorator}
                  customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Surname") }]}
                />
              </Col>
              <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
                <VisaInput
                  label="Last Name"
                  field="data.other.given_name"
                  initialValue={data.other.given_name}
                  getFieldDecorator={getFieldDecorator}
                  customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Given Name") }]}
                />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
                <VisaSelectItem
                  label="Relationship to you"
                  field="data.other.relationship"
                  initialValue={data.other.relationship}
                  content={{
                    combines: constants.export_list(constants.relative_relationship_options)
                  }}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <VisaSelectItem
                  label="Immigration Status"
                  field="data.other.status"
                  initialValue={data.other.status}
                  content={{
                    combines: constants.export_list(constants.US_Live_Status)
                  }}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
            </Row>
          </Form.Item>
        }

        {
          this.props.form.getFieldValue('data.b_other_relative') == false &&
          <VisaRadio
            label="Do you have any other relatives in the United States?"
            field="data.b_more_relatives"
            initialValue={data.b_more_relatives}
            getFieldDecorator={getFieldDecorator}
          />
        }

        <div className="visa-global-field visa-global-border-bottom">
          <h2 className="visa-global-section-title">Family information : Your Spouse Information</h2>
        </div>

        <Form.Item label="List your Spouse's information here" required>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <VisaInput
                label="Spouse's First Name"
                extra="Leave blank if you do not know"
                field="data.spouse.surname"
                initialValue={data.spouse.surname}
                getFieldDecorator={getFieldDecorator}
                customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Surname") }]}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <VisaInput
                label="Spouse's Last Name"
                extra="Leave blank if you do not know"
                field="data.spouse.given_name"
                initialValue={data.spouse.given_name}
                getFieldDecorator={getFieldDecorator}
                customRule={[{ validator: (rule, value, callback) => this.props.validators.validateName(rule, value, callback, "Given Name") }]}
              />
            </Col>
          </Row>
          <VisaDatePicker 
            label="Spouse's date of birth (If known)"
            extra="Please enter the Date Format as Day/Month/Year For example January 12 2013 enter 12/01/2013"
            field="data.spouse.birthday"
            initialValue={data.spouse.birthday}
            getFieldDecorator={getFieldDecorator}
            required={false}
            customRule={[{ validator: (rule, value, callback) => this.props.validators.validateEarlierDate(rule, value, callback, false) }]}
          />
          <Form.Item label="Place of birth">
            <Row gutter={16}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <VisaInput
                  label="City"
                  extra="Leave blank if you do not know"
                  field="data.spouse.place_of_birth.city"
                  initialValue={data.spouse.place_of_birth.city}
                  getFieldDecorator={getFieldDecorator}
                  required={false}
                />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <VisaSelectItem
                  label="Country"
                  field="data.spouse.place_of_birth.country"
                  initialValue={data.spouse.place_of_birth.country}
                  content={{
                    combines: constants.export_list(constants.relationship_options)
                  }}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
            </Row>
          </Form.Item>
          <VisaAddress 
            label="Address"
            field="data.spouse.address"
            initialValue={data.spouse.address}
            getFieldDecorator={getFieldDecorator}
          />
        </Form.Item>

        <div className="visa-form-bottom-btn-group">
          {showPrev && <Button style={{ marginRight: 8 }} onClick={this.handlePrev}>Prev</Button>}
          {showNext && <Button type="primary" htmlType="submit">Next</Button>}
          <Button type="link" onClick={this.handleSave}>Save and Continue Later</Button>
        </div>
      </Form>

    );
  }
}
const Form_DS160_10_Family = Form.create()(MyForm)
export default Form_DS160_10_Family;