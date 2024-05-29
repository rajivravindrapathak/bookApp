import { Button, Col, Form, Modal, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const NoteForm = ({ showNoteForm, setShowNoteForm, userId, getNotesData, onEdit, editData  }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationDate: '',
        // userId:userId,
    })

    useEffect(() => {
        debugger
        if(editData) {
            setFormData(editData)
        }
    }, [editData])

    const handleChange = (e) => {
        setFormData((pre)=>{ 
            return({
            ...pre,
            [e.target.name]: e.target.value 
        })})
    }

    const onFinish = async () => {
        try {
            // debugger;

            if(formData._id) {
                debugger
                const dataToSend = { ...formData }
                const token = localStorage.getItem('token');
                const response = await axios.put(`http://localhost:8000/update-user-notes/${formData._id}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,     
                    },
                });
                // console.log('Response from backend:', response.data);
                if(response) {

                
                if(response.data.status === "success") {
                  Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.data.msg,
                  });
                } else {    
                  Swal.fire({
                    icon: 'Error',
                    title: 'Error!',
                    text: response.data.msg,
                  });
                }
                }
                setShowNoteForm(false);
                getNotesData();
            } else { 
                debugger
                const dataToSend = { ...formData, userId }
                const token = localStorage.getItem('token');
                const response = await axios.post(`http://localhost:8000/user-notes`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if(response.data.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.data.msg,
                    });
                } else {
                    Swal.fire({
                        icon: 'Error',
                        title: 'Error!',
                        text: response.data.msg,
                    });
                }
                // console.log('Response from backend:', response.data);
                setShowNoteForm(false);
                getNotesData()
            }

            
        } catch (error) {
            console.log('Error:', error.response.data)
            Swal.fire({
                icon: 'Error',
                title: 'Error!',
                text: error,
            });
        }
    }

    return ( 
        <>
            <p>NoteForm</p>
            <Modal 
                width={800}
                title='create notes' 
                visible={showNoteForm}
                onCancel={() => setShowNoteForm(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label='title:' name='title'>
                        <input 
                            type="text"
                            name='title'
                            value={formData?.title} 
                            onChange={handleChange}
                        />  
                    </Form.Item>
                    <Form.Item label='author:' name='author'>
                        <input 
                            type="text" 
                            name='author'
                            value={formData?.author} 
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label='isbn:' name='isbn'>
                        <input 
                            type="text"
                            name='isbn'
                            value={formData.isbn} 
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label='Publication Date:' name='publicationDate'>
                        <input
                            type="date"
                            name='publicationDate'
                            value={formData.publicationDate}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <div>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">save</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default NoteForm;