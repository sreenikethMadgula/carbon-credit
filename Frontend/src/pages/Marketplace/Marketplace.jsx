import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Button } from 'antd';
import { InputNumber } from "antd";

//Static files
import StackOSImg from '../../assets/stack.jpeg'
import Logo from '../../assets/Logo.png'
import './Marketplace.scss'
import FormItemLabel from "antd/es/form/FormItemLabel";

const MarketPlace = () => {
    const ProjectDesc = () => {
        return (
            <div className="desc_container">
                <div className="desc_container-heading">Buy carbon credits</div>
                <div className="desc_container-description">Offset your carbon footprint today – buy carbon credits and champion a sustainable tomorrow.
                </div>
            </div>
        )
    }

    const SellDesc = () => {
        return (
            <div className="desc_container">
                <div className="desc_container-heading">Sell carbon credits</div>
                <div className="desc_container-description">Offset your carbon footprint today – buy carbon credits and champion a sustainable tomorrow.
                </div>
            </div>
        )
    }

    const SellData = () =>{

        const onChange = (value) => {
            console.log('changed', value);
        };

        return(
            <div className="selling_content">
                <InputNumber min={1} max={10} placeholder="Quantity" size="large"  onChange={onChange} />
                <InputNumber min={1} max={10} placeholder="Price" size="large"  onChange={onChange} />
                <Button size="large">Sell</Button>
            </div>
        )
    }


    const OrganizationData = () => {
        const columns = [

            {
                title: 'Organisation',
                dataIndex: 'org',
                key: 'org',
                render: (text) => <a>{text}</a>,
            },
            {
                title: 'Qunatity',
                dataIndex: 'qty',
                key: 'qty',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Action',
                key: 'action', width: 150,
                render: (_, record) => (
                    <Space size="middle">
                        <Button>Buy</Button>
                    </Space>
                ),
            },
        ];
        const data = [
            {
                key: '1',
                org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
                qty: '10.2CC',
                price: '$10'
            },
            {
                key: '2',
                org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
                qty: '10.2CC',
                price: '$10'
            }, {
                key: '3',
                org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
                qty: '10.2CC',
                price: '$10'
            }, {
                key: '4',
                org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
                qty: '10.2CC',
                price: '$10'
            }, {
                key: '5',
                org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
                qty: '10.2CC',
                price: '$10'
            }, {
                key: '6',
                org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
                qty: '10.2CC',
                price: '$10'
            },
        ];
        return (
            <>
                <Table className="table_layout" columns={columns} dataSource={data} />
            </>
        )
    }

    return (
        <>
            <div className="marketplace_container">
                <Layout style={{ backgroundColor: "white" }}>
                    <Header
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className="demo-logo" />
                        <Menu theme="dark" mode="horizontal" />
                        <a style={{ height : "75%"}} href="/"><img style={{ height: "60%" }} src={Logo} /></a>
                    </Header>
                </Layout>
                <div className="transaction_content">
                <div className="buy_container">
                <Layout className="internal_container">
                    <ProjectDesc />
                </Layout>
                <Layout className="internal_container">
                    <OrganizationData />
                </Layout>
                </div>
                <div className="buy_container">
                <Layout className="internal_container">
                    <SellDesc />
                </Layout>
                <Layout className="internal_container">
                    <SellData />
                </Layout>
                </div>

                </div>
            </div>
        </>
    )
}

export default MarketPlace