import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, TimePicker, Upload, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
export default function PicturePage() {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [open, setOpen] = useState(false);


  dayjs.extend(customParseFormat);
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <section>
      <div className='container border border-yellow-500 py-10 px-20 rounded-md bg-zinc-900'>
        <div className="m-auto">
          <Form
            layout="vertical"
          >
            <h1 className='text-center text-yellow-500 font-extrabold text-4xl'>ADD PICTURES</h1>
            <Form.Item label="Image Name">
              <Input className='p-2' />
            </Form.Item>
            <Form.Item label="Image Capture Time">
              <Space className='flex gap-5'>
                <DatePicker className='p-2 w-full'
                  defaultValue={dayjs(new Date())}
                  format={dateFormatList} />
                <TimePicker
                  className='p-2 w-full'
                  open={open}
                  onOpenChange={setOpen}
                  defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
                  renderExtraFooter={() => (
                    <Button size="large" type="primary" onClick={() => setOpen(false)}>
                      OK
                    </Button>
                  )}
                />
              </Space>
            </Form.Item>
            <Form.Item label="Image Description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Add Image(less than 10)">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className='text-6xl' />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Space className='flex justify-center mt-5 gap-9'>
                <button className='btn-orange w-48' type="primary" htmlType="submit">
                  Submit
                </button>
                <button className='btn-outline-orange w-48' htmlType="button" onClick={onReset}>
                  Reset
                </button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}
