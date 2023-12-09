import React, { useState } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import { Space, Table, Tag, Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import Web3 from 'web3';

//Static files
import './Homepage.scss'
import StackOSImg from '../assets/stack.jpeg'
import Logo from '../assets/Logo.png'

const ProjectDesc = () => {
    return (
        <div className="desc_container">
            <div className="desc_container-heading">Carbon-Credit</div>
            <div className="desc_container-description">The idea of tokenized carbon credits involves leveraging blockchain technology to create a decentralized platform for trading carbon credits.
            Carbon credits are tradable permits or certificates that represent the right to emit a specific amount of greenhouse gases. These credits are typically earned by organizations or individuals who reduce their carbon footprint or engage in activities that absorb or prevent the release of greenhouse gases. By tokenizing carbon credits on a blockchain, this idea aims to make carbon trading more efficient, transparent, and accessible, ultimately contributing to global efforts to combat climate change.
            </div>
            <div style={{ fontSize : "16px"}}>Explore the <a href="/marketplace">marketplace.</a></div>
        </div>
    )
}

const OrganizationData = () => {
    const columns = [
        {
            title: 'Rate of Change',
            dataIndex: 'ratechange',
            key: 'ratechange',
            render: (text) => <a>{text}</a>,
            width: 150,
            alignItems: 'center',
        },
        {
            title: 'Organisation',
            dataIndex: 'org',
            key: 'org',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Carbon Emission',
            dataIndex: 'carbem',
            key: 'carbem',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button>Reward</Button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            ratechange: <div><span><CaretUpOutlined style={{ color: '#08c', fontSize: "1.2rem" }} />3%</span></div>,
            org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
            carbem: '10.2CC',
            tags: ['Low', 'Harmless'],
        },
        {
            key: '2',
            ratechange: <CaretUpOutlined style={{ color: '#08c', fontSize: "1.2rem" }} />,
            org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
            carbem: '10.2CC',
            tags: ['Low', 'Harmless'],
        }, {
            key: '3',
            ratechange: <CaretUpOutlined style={{ color: '#08c', fontSize: "1.2rem" }} />,
            org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
            carbem: '10.2CC',
            tags: ['Low', 'Harmless'],
        }, {
            key: '4',
            ratechange: <CaretUpOutlined style={{ color: '#08c', fontSize: "1.2rem" }} />,
            org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
            carbem: '10.2CC',
            tags: ['Low', 'Harmless'],
        }, {
            key: '5',
            ratechange: <CaretUpOutlined style={{ color: '#08c', fontSize: "1.2rem" }} />,
            org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
            carbem: '10.2CC',
            tags: ['Low', 'Harmless'],
        }, {
            key: '6',
            ratechange: <CaretUpOutlined style={{ color: '#08c', fontSize: "1.2rem" }} />,
            org: <div className="table_org_content"><span><img className="table_img" src={StackOSImg} /></span>StackOS</div>,
            carbem: '10.2CC',
            tags: ['Low', 'Harmless'],
        },
    ];
    return (
        <>
            <Table className="table_layout" columns={columns} dataSource={data} />
        </>
    )
}

const HomePage = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [web3, setWeb3] = useState(null);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const connectToMetaMask = async () => {
        if (window.ethereum) {
            try {
                // Requesting access to MetaMask
                await window.ethereum.request({ method: 'eth_requestAccounts' });
    
                // Creating Web3 instance
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                // Get the selected account
                // console.log("A",web3Instance.eth.getUncle)
                const accounts = await web3Instance.eth.getAccounts();
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]); // Set the wallet address in state
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.error('MetaMask extension not detected');
        }
    };
    return (
        <>
            <div className="home_container">
            <Layout style={{ backgroundColor: "white" }}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                    }}
                >
                    <a style={{ height : "75%"}} href="/"><img style={{ height: "60%"}} src={Logo}/></a>
                    {walletAddress ? <p className="wallet_details">Connected wallet - {walletAddress}</p> : <Button onClick={() => connectToMetaMask()}>Connect Wallet</Button> }
                </Header>

            </Layout>
            <Layout style={{ borderRadius: "12px" }} className="internal_container">
                <ProjectDesc />
            </Layout>
            <Layout style={{ borderRadius: "16px" }} className="internal_container">
                <OrganizationData />
            </Layout>
            </div>
        </>
    )
}

export default HomePage;