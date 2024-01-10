import { Button, Form, Input, Modal, Pagination, Table } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../redux/TodoSlice';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Home = () => {
    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();

    const [modalPopup, setModelPopup] = useState(false);
    const [editingItems, setEditingItems] = useState(null);



    // Pagination * 

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // const save data 

    const onFinish = (values) => {

        // Configuration OF Add & Edit
        if (editingItems === null) {

            const newTodo = { ...values, id: Date.now() }; // Generate unique ID
            dispatch(addTodo(newTodo));
        }


        else {

            const updatedTodo = { ...values, id: editingItems.id };
            dispatch(updateTodo({ id: editingItems.id, updatedTodo }));

        }

        setModelPopup(false);
        setEditingItems(null);
    }


    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    }

    const columns = [

        {
            title: 'Todo',
            dataIndex: 'name',


        },
        {
            title: 'Description',
            dataIndex: 'description',

        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (id, record) => <div className='flex justify-center items-center'>
                <DeleteOutlined onClick={() => handleDelete(record.id)} className='mx-2' />
                <EditOutlined className='mx-2' onClick={() => {
                    setEditingItems(record);
                    setModelPopup(true)
                }} />
            </div>

        }
    ];


    //  Pagination code 
    const currentTodos = todos.slice((currentPage - 1) * pageSize, currentPage * pageSize);






    return (
        <div className='w-[85%] m-auto bg-white '>
            <div className='flex  justify-end items-end'>
                <Button className='mt-5 my-5' onClick={() => { setModelPopup(true) }}>Add Todo</Button>
            </div>

            <Table
                dataSource={currentTodos}
                columns={columns}
                pagination={false}
                rowKey="id"
            />

            {/* Pagination */}

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={todos.length}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                }}
                showSizeChanger
                onShowSizeChange={(current, size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />


            {
                modalPopup && (
                    <Modal onCancel={() => {
                        setModelPopup(false)
                        setEditingItems(null)
                    }}
                        open={modalPopup}
                        title={`${editingItems !== null ? 'Edit Task' : "Add Task"}`}
                        footer={false} >

                        <Form
                            initialValues={editingItems}
                            layout="vertical" onFinish={onFinish}>
                            <Form.Item name='name' label='Name' >
                                <Input />
                            </Form.Item>
                            <Form.Item name='description' label='Description' >
                                <Input />
                            </Form.Item>


                            <div className='flex justify-end'>

                                <Button htmlType='submit' className=''>Save</Button>
                            </div>
                        </Form>
                    </Modal>
                )
            }




        </div>
    );
};

export default Home;