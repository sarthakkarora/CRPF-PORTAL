import React, { useState, useEffect } from 'react';
import { DatePicker, notification, Upload, Button, Input, Select, Typography, Form, Divider, Steps, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/reset.css';
import './FundRequestPage.css';

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const FundRequestPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    requesterName: '',
    designation: '',
    contactInfo: '',
    purpose: '',
    amount: '',
    fundType: '',
    dateRequiredBy: '',
    documents: [],
    budgetBreakdown: [],
    supervisor: '',
    comments: '',
  });
  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [pastRecords, setPastRecords] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('fundRequestForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    const savedRecords = localStorage.getItem('submittedRecords');
    if (savedRecords) {
      setPastRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fundRequestForm', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('submittedRecords', JSON.stringify(pastRecords));
  }, [pastRecords]);

  const validateStep = () => {
    let isValid = true;
    let newErrors = {};

    if (currentStep === 0) {
      if (!formData.requesterName) {
        newErrors.requesterName = 'Full Name is required.';
        isValid = false;
      }
      if (!formData.designation) {
        newErrors.designation = 'Designation is required.';
        isValid = false;
      }
      if (!formData.contactInfo) {
        newErrors.contactInfo = 'Contact Information is required.';
        isValid = false;
      }
      if (!formData.purpose) {
        newErrors.purpose = 'Purpose of Fund is required.';
        isValid = false;
      }
      if (!formData.amount) {
        newErrors.amount = 'Amount Requested is required.';
        isValid = false;
      }
      if (!formData.fundType) {
        newErrors.fundType = 'Fund Type is required.';
        isValid = false;
      }
      if (!formData.dateRequiredBy) {
        newErrors.dateRequiredBy = 'Date Required By is required.';
        isValid = false;
      }
    } else if (currentStep === 1) {
      if (formData.budgetBreakdown.some(item => !item.item || !item.cost)) {
        newErrors.budgetBreakdown = 'Each budget item must have a name and cost.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setFormData({
      ...formData,
      dateRequiredBy: dateString,
    });
  };

  const handleFileChange = (info) => {
    if (info.fileList.length <= 5) {
      setFormData({
        ...formData,
        documents: info.fileList,
      });
    } else {
      notification.error({
        message: 'File Limit Exceeded',
        description: 'You can only upload up to 5 files.',
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setPastRecords([...pastRecords, formData]);
    setFormData({
      requesterName: '',
      designation: '',
      contactInfo: '',
      purpose: '',
      amount: '',
      fundType: '',
      dateRequiredBy: '',
      documents: [],
      budgetBreakdown: [],
      supervisor: '',
      comments: '',
    });

    notification.success({
      message: 'Form Submitted',
      description: 'Your fund request has been successfully submitted.',
    });
  };

  const handleAddBudgetItem = () => {
    setFormData({
      ...formData,
      budgetBreakdown: [...formData.budgetBreakdown, { item: '', cost: '' }],
    });
  };

  const handleBudgetChange = (index, e) => {
    const newBudgetBreakdown = formData.budgetBreakdown.slice();
    newBudgetBreakdown[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      budgetBreakdown: newBudgetBreakdown,
    });
  };

  const handleRemoveBudgetItem = (index) => {
    const newBudgetBreakdown = formData.budgetBreakdown.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      budgetBreakdown: newBudgetBreakdown,
    });
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const saveForLater = () => {
    setIsSaving(true);
    notification.success({
      message: 'Progress Saved',
      description: 'Your progress has been saved. You can resume later.',
    });
    setIsSaving(false);
  };

  const progress = (currentStep + 1) * (100 / 3);

  return (
    <div className="fund-request-page">
      <h1 level={1}>CRPF Fund Request Page</h1>
      <Progress percent={progress} />
      <Steps current={currentStep} className="steps">
        <Step title="Basic Information" />
        <Step title="Budget Breakdown" />
        <Step title="Documents & Submission" />
      </Steps>

      <Form layout="vertical" onFinish={handleSubmit}>
        {currentStep === 0 && (
          <div className="step-content">
            <Form.Item label="Full Name" validateStatus={errors.requesterName ? 'error' : ''} help={errors.requesterName}>
              <Input
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </Form.Item>
            <Form.Item label="Designation" validateStatus={errors.designation ? 'error' : ''} help={errors.designation}>
              <Input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter your designation"
              />
            </Form.Item>
            <Form.Item label="Contact Information" validateStatus={errors.contactInfo ? 'error' : ''} help={errors.contactInfo}>
              <Input
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Enter your contact information"
              />
            </Form.Item>
            <Form.Item label="Purpose of Fund" validateStatus={errors.purpose ? 'error' : ''} help={errors.purpose}>
              <TextArea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Describe the purpose of the fund request"
              />
            </Form.Item>
            <Form.Item label="Amount Requested" validateStatus={errors.amount ? 'error' : ''} help={errors.amount}>
              <Input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter the amount requested"
                type="number"
              />
            </Form.Item>
            <Form.Item label="Fund Type" validateStatus={errors.fundType ? 'error' : ''} help={errors.fundType}>
              <Select
                name="fundType"
                value={formData.fundType}
                onChange={(value) => setFormData({ ...formData, fundType: value })}
                placeholder="Select fund type"
              >
                <Option value="Operational">Operational</Option>
                <Option value="Emergency">Emergency</Option>
                <Option value="Development">Development</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date Required By" validateStatus={errors.dateRequiredBy ? 'error' : ''} help={errors.dateRequiredBy}>
              <DatePicker
                name="dateRequiredBy"
                value={formData.dateRequiredBy ? moment(formData.dateRequiredBy) : null}
                onChange={handleDateChange}
                placeholder="Select the date required by"
              />
            </Form.Item>
          </div>
        )}
        {currentStep === 1 && (
          <div className="step-content">
            <Button type="dashed" onClick={handleAddBudgetItem}>
              Add Budget Item
            </Button>
            {formData.budgetBreakdown.map((item, index) => (
              <div key={index} className="budget-item">
                <Form.Item label="Item" validateStatus={errors.budgetBreakdown ? 'error' : ''} help={errors.budgetBreakdown}>
                  <Input
                    name="item"
                    value={item.item}
                    onChange={(e) => handleBudgetChange(index, e)}
                    placeholder="Enter item name"
                  />
                </Form.Item>
                <Form.Item label="Cost" validateStatus={errors.budgetBreakdown ? 'error' : ''} help={errors.budgetBreakdown}>
                  <Input
                    name="cost"
                    value={item.cost}
                    onChange={(e) => handleBudgetChange(index, e)}
                    placeholder="Enter cost"
                    type="number"
                  />
                </Form.Item>
                <Button type="link" danger onClick={() => handleRemoveBudgetItem(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        {currentStep === 2 && (
          <div className="step-content">
            <Form.Item label="Upload Documents">
              <Upload
                fileList={formData.documents}
                onChange={handleFileChange}
                beforeUpload={() => false}
                multiple
              >
                <Button icon={<UploadOutlined />}>Upload (max 5 files)</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Supervisor's Name">
              <Input
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                placeholder="Enter supervisor's name"
              />
            </Form.Item>
            <Form.Item label="Additional Comments">
              <TextArea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Any additional comments or details"
              />
            </Form.Item>
          </div>
        )}

        <div className="form-actions">
          <Button type="default" onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep < 2 && (
            <Button type="primary" onClick={nextStep} loading={isSaving}>
              Next
            </Button>
          )}
          {currentStep === 2 && (
            <Button type="primary" htmlType="submit" loading={isSaving}>
              Submit
            </Button>
          )}
          {currentStep === 2 && (
            <Button type="default" onClick={saveForLater} loading={isSaving}>
              Save for Later
            </Button>
          )}
        </div>
      </Form>

      <div className="past-records">
        <Typography.Title level={2}>Past Fund Requests</Typography.Title>
        <ul>
          {pastRecords.map((record, index) => (
            <li key={index}>
              {record.requesterName} - {record.amount} - {moment(record.dateRequiredBy).format('YYYY-MM-DD')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FundRequestPage;
