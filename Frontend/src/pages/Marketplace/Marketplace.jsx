import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Button } from 'antd';
import { InputNumber } from "antd";
import { ethers } from 'ethers';
import { Toaster, toast } from 'sonner'

//Static files
import StackOSImg from '../../assets/stack.jpeg'
import Logo from '../../assets/Logo.png'
import './Marketplace.scss'
import FormItemLabel from "antd/es/form/FormItemLabel";
import MarketplaceABI from "../../assets/Marketplace";


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
        const [quantity,setQuantity] = useState(null)
        const [price,setPrice] = useState(null)
        const onQuantityChange = (value) => {
            console.log('changed', value);
            setQuantity(value)
        };
        const onPriceChange = (value) => {
            console.log('changed', value);
            setPrice(value)
        };

        const sellCCToken = async (quantity,price) => {
            if(typeof window.ethereum !== "undefined"){
                const contractAddress = '0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0';
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner(0)
                console.log("provider", provider)
    
                const contract = new ethers.Contract (
                    contractAddress,
                    MarketplaceABI,
                    signer
                )
                console.log("contract", contract)
                try {
                    const transaction = await contract.createListing(quantity,price)
                    await transaction.wait()
                    console.log("data", transaction)
                    {transaction && toast.success('Congratulations! Listing created successfully.')}
                } catch (err) {
                    console.log("error", err)
    
                }
        }

    }

    async function buyCToken() {
        if(typeof window.ethereum !== "undefined"){
            const contractAddress = '0x8eCEE3795D22f95F608a7000bAda71ff1b8cAdA0';
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner(0)
            console.log("provider", provider)

            const contract = new ethers.Contract (
                contractAddress,
                MarketplaceABI,
                signer
            )
            console.log("contract", contract)
            try {
                const options = {value: ethers.utils.parseEther("1.0")}
                const transaction = await contract.makeOffer(1,1, options)
                await transaction.wait()
                console.log("data", transaction)
                {transaction && toast.success('Congratulations! Token issued successful.')}
            } catch (err) {
                console.log("error", err)

            }
    }
    }

    // async function getListings() {
    //     if(!typeof window.ethereum !== "undefined"){
    //         const contractAddress = '0x04C6C2726c57292aFc8bfb980068EFC52D620D4B';
    //         const provider = new ethers.providers.Web3Provider(window.ethereum)
    //         console.log("provider", provider)
    //         // const listingData = []

    //         const contract = new ethers.Contract (
    //             contractAddress,
    //             MarketplaceABI,
    //             provider
    //         )
    //         console.log("contract", contract)
    //         try {
    //             const data = await contract.get_listings
    //             // for (int i =0; i <)
    //             const data = await contract.listings()
    //             console.log("data", data)
    //         } catch (err) {
    //             console.log("error", err)

    //         }
    //     }
    // }
    return(
        <div className="selling_content">
            <InputNumber min={1} max={1000} placeholder="Quantity" size="large"  onChange={onQuantityChange} />
            <InputNumber min={1} max={10000} placeholder="Price" size="large"  onChange={onPriceChange} />
            <Button size="large" onClick={() => sellCCToken(quantity,price)}>Sell</Button>
            {/* <Button size="large" onClick={() => getListings()}>k</Button>
            <Button size="large" onClick={() => buyCToken()}>b</Button> */}
        </div>
    )}


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
            <Toaster position="top-center" richColors toastOptions={{ style: { fontSize: "0.9rem" } }} />
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