import React, { Component } from "react";
import { Form, Button, Select, Checkbox, Input, Radio, DatePicker, Row, Col } from 'antd';
import * as constants from '../../../../utils/constants'
import VisaSelect from "../../../../components/VisaSelect";
import moment from 'moment'

const { Option } = Select;

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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onNext(values.data);
      }
    });
  };

  onSelect = (e, field) => {
    console.log(e, field)
    if(field == 'purpose_of_trip') {
      this.props.form.setFieldsValue({ 'data.other_purpose_of_trip': undefined, 'data.purpose_info_type': undefined });
    }
    else if( field == 'other_purpose_of_trip' ) {
      const field = {
        purpose_of_trip: this.props.form.getFieldValue('data.purpose_of_trip'),
        other_purpose_of_trip: this.props.form.getFieldValue('data.other_purpose_of_trip'),
      }
      if (field.purpose_of_trip && field.other_purpose_of_trip) {
        let purpose_info_type = constants.purpose_of_trip_advanced_specify_extra[field.purpose_of_trip][field.other_purpose_of_trip]
        this.props.form.setFieldsValue({ 'data.purpose_info_type': purpose_info_type });
      }
    }
  }
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

    const { showPrev, showNext, onPrev, onNext, data } = this.props

    const field = {
      purpose_of_trip: this.props.form.getFieldValue('data.purpose_of_trip'),
      other_purpose_of_trip: this.props.form.getFieldValue('data.other_purpose_of_trip'),
      paying_person_for_trip: this.props.form.getFieldValue('data.paying_person_for_trip'),
      paying_person_info_same_addr: this.props.form.getFieldValue('data.paying_person_info.b_same_address'), 
      purpose_info_type: this.props.form.getFieldValue('data.purpose_info_type')
    }
    
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <div className="visa-global-field visa-global-border-bottom">
          <h2 className="visa-global-section-title">Travel Information</h2>
        </div>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="Purpose of Trip to the U.S." extra="PLEASE SELECT A VISA CLASS">
              {getFieldDecorator('data.purpose_of_trip', {
                initialValue: data.purpose_of_trip,
                rules: [{ required: true, message: 'This field is required' }],
              })(
                <VisaSelect 
                  combines={constants.purpose_of_trip_advanced_options_func()} 
                  onChange={(e) => this.onSelect(e, 'purpose_of_trip')}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        {
          field.purpose_of_trip &&
          <Row gutter={16}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item label="Specify (B)">
                {getFieldDecorator('data.other_purpose_of_trip', {
                  initialValue: data.other_purpose_of_trip,
                  rules: [{ required: true, message: 'This field is required' }],
                })(
                  <VisaSelect 
                    combines={constants.purpose_of_trip_advanced_specify_options_func(field.purpose_of_trip)}
                    onChange={(e) => this.onSelect(e, 'other_purpose_of_trip')}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        }
        <Form.Item style={{display: 'none'}}>
          {getFieldDecorator('data.purpose_info_type', {
            initialValue: data.purpose_info_type,
          })(
            <Input />
          )}
        </Form.Item>
        {
          field.purpose_info_type && field.purpose_info_type.includes('N') &&
          <Form.Item label="Principal Applicant Information">
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label="Surname(s) (Last Name)">
                  {getFieldDecorator('data.purpose_info.surname', {
                    initialValue: data.purpose_info.surname,
                    rules: [{ required: true, message: 'This field is required' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label="Given Name(s) (First Name)">
                  {getFieldDecorator('data.purpose_info.given_name', {
                    initialValue: data.purpose_info.given_name,
                    rules: [{ required: true, message: 'This field is required' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        }
        {
          field.purpose_info_type && field.purpose_info_type.includes('P') &&
          <Form.Item label="Application Receipt/Petition Number" extra="If you are applying for a petition-based visa, your application receipt/petition number was given to you by the Department of Homeland Security’s U. S. Citizenship and Immigration Services (USCIS) after you filed your petition application at a USCIS Service Center. The application receipt/petition number is 13 characters long and the first three characters are letters. If Not Applicable please put N/A">
            {getFieldDecorator('data.purpose_info.petition', {
              initialValue: data.purpose_info.petition,
            })(
              <Input />
            )}
          </Form.Item>
        }

        <div className="visa-global-field visa-global-border-bottom">
          <h2 className="visa-global-section-title">US Travel Information</h2>
          <div className="visa-global-section-description">Give details of the address where you will stay in the US. The address may be that of a hotel or private residence.</div>
        </div>

        <Form.Item label="Intended date of arrival in the USA" extra="If you don't know your exact date of travel, please provide an estimate. Please enter the Date Format as Day/Month/Year For example January 12 2013 enter 12/01/2013">
          {getFieldDecorator('data.travel_plan.date_of_arrival', {
            initialValue: moment(data.travel_plan.date_of_arrival),
            rules: [{ required: true, message: 'This field is required' }],
          })(
            <DatePicker />
          )}
        </Form.Item>

        <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 8 }}>
            <Form.Item label="Intended Length of Stay in the USA" extra="Enter the Number of Day(s), Week(s), Month(s), Year(s) ONLY THE NUMBER.">
              {getFieldDecorator('data.travel_plan.length_of_stay.length', {
                initialValue: data.travel_plan.length_of_stay.length,
                rules: [{ required: true, message: 'This field is required' }],
              })(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 8, offset: 4 }}>
            <Form.Item label="Please Specify">
              {getFieldDecorator('data.travel_plan.length_of_stay.period', {
                initialValue: data.travel_plan.length_of_stay.period,
                rules: [{ required: true, message: 'This field is required' }],
              })(
                <VisaSelect combines={constants.period_unit_options}/>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Address Where You Will Stay in the U.S.">
          <Form.Item extra="Street Address">
            {getFieldDecorator('data.address_you_will_stay.street_addr1', {
              initialValue: data.address_you_will_stay.street_addr1,
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item extra="Address Line 2">
            {getFieldDecorator('data.address_you_will_stay.street_addr2', {
              initialValue: data.address_you_will_stay.street_addr2,
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item extra="City">
                {getFieldDecorator('data.address_you_will_stay.city', {
                  initialValue: data.address_you_will_stay.city,
                  rules: [{ required: true, message: 'This field is required' }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item extra="State">
                {getFieldDecorator('data.address_you_will_stay.state', {
                  initialValue: data.address_you_will_stay.state,
                  rules: [{ required: true, message: 'This field is required' }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item extra="ZIP Code">
                {getFieldDecorator('data.address_you_will_stay.zip_code', {
                  initialValue: data.address_you_will_stay.zip_code,
                  rules: [{ required: true, message: 'This field is required' }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        
        <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="Person/Entity Paying for Your Trip">
              {getFieldDecorator('data.paying_person_for_trip', {
                initialValue: data.paying_person_for_trip,
                rules: [{ required: true, message: 'This field is required' }],
              })(
                <VisaSelect combines={constants.paying_person_for_trip_options}/>
              )}
            </Form.Item>
          </Col>
        </Row>

        {
          (field.paying_person_for_trip == 'O' || field.paying_person_for_trip == 'C') &&
            <div className="visa-global-field visa-global-border-bottom">
              <h2 className="visa-global-section-title">Financial support for your trip</h2>
            </div>
        }

        {
          field.paying_person_for_trip == 'O' ? 
            <>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item label="Surnames of Person Paying for Trip" extra="(e.g., FERNANDEZ GARCIA)">
                    {getFieldDecorator('data.paying_person_info.surname', {
                      initialValue: data.paying_person_info.surname,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item label="Given Names of Person Paying for Trip" extra="(e.g., JUAN MIGUEL)">
                    {getFieldDecorator('data.paying_person_info.given_name', {
                      initialValue: data.paying_person_info.given_name,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item label="Phone number of person paying for your trip">
                    {getFieldDecorator('data.paying_person_info.tel_number', {
                      initialValue: data.paying_person_info.tel_number,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item label="Email of person paying for your trip" extra="Leave blank if does not apply">
                    {getFieldDecorator('data.paying_person_info.email', {
                      initialValue: data.paying_person_info.email,
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item label="Relationship to You">
                    {getFieldDecorator('data.paying_person_info.relationship', {
                      initialValue: data.paying_person_info.relationship,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <VisaSelect combines={constants.paying_person_info_relationship_options}/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item label="Is the address of the party paying for your trip the same as your Home or Mailing Address?">
                    {getFieldDecorator('data.paying_person_info.b_same_address', {
                      initialValue: data.paying_person_info.b_same_address,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </>
          : field.paying_person_for_trip == 'C' ? 
          <>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label="Name of Company/Organization Paying for Trip">
                  {getFieldDecorator('data.paying_org_info.name', {
                    initialValue: data.paying_org_info.name,
                    rules: [{ required: true, message: 'This field is required' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label="Telephone Number">
                  {getFieldDecorator('data.paying_org_info.tel_number', {
                    initialValue: data.paying_org_info.tel_number,
                    rules: [{ required: true, message: 'This field is required' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label="Relationship to You">
                  {getFieldDecorator('data.paying_org_info.relationship', {
                    initialValue: data.paying_org_info.relationship,
                    rules: [{ required: true, message: 'This field is required' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </>
            : ''
        }
        {
          (field.paying_person_for_trip == 'O' && field.paying_person_info_same_addr == false) || field.paying_person_for_trip == 'C' ?
            <Form.Item label={field.paying_person_for_trip == 'C' ? "Address of Company/Organization Paying" : "Address"}>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item extra="Street Address">
                    {getFieldDecorator('data.paying_person_info.address.street_addr1', {
                      initialValue: data.paying_person_info.address.street_addr1,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                  <Form.Item extra="Address Line 2">
                    {getFieldDecorator('data.paying_person_info.address.street_addr2', {
                      initialValue: data.paying_person_info.address.street_addr2,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                  <Form.Item extra="City">
                    {getFieldDecorator('data.paying_person_info.address.city', {
                      initialValue: data.paying_person_info.address.city,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                  <Form.Item extra="State / Province / Region">
                    {getFieldDecorator('data.paying_person_info.address.state', {
                      initialValue: data.paying_person_info.address.state,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                  <Form.Item extra="ZIP / Postal Code">
                    {getFieldDecorator('data.paying_person_info.address.zip_code', {
                      initialValue: data.paying_person_info.address.zip_code,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                  <Form.Item extra="Country">
                    {getFieldDecorator('data.paying_person_info.address.country', {
                      initialValue: data.paying_person_info.address.country,
                      rules: [{ required: true, message: 'This field is required' }],
                    })(
                      <VisaSelect values={constants.countries_only_option_value_list} labels={constants.countries_only_option_label_list} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          : ''
        }
        <div className="visa-form-bottom-btn-group">
          {showPrev && <Button style={{ marginRight: 8 }} onClick={this.handlePrev}>Prev</Button>}
          {showNext && <Button type="primary" htmlType="submit">Next</Button>}
          <Button type="link" onClick={this.handleSave}>Save and Continue Later</Button>
        </div>
      </Form>

    );
  }
}
const Form_DS160_4_Travel = Form.create()(MyForm)
export default Form_DS160_4_Travel;
