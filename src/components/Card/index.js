import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./style.css";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import { useEffect } from "react";
import { globalVar } from "db";
import { supabase } from "supabaseClient";
const stockData = [
    { name: "May 2021", value: 3000 },
    { name: "Jun 2021", value: 5000 },
    { name: "Jul 2021", value: 4500 },
    { name: "Aug 2021", value: 6000 },
    { name: "Sep 2021", value: 5500 },
];

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState("1M");
    

    // var ctx = document.getElementById('canvas').getContext("2d")
    // var gradient = ctx.createLinearGradient(0, 0, 0, 400)
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Sidebar />
            <div className="content-wrapper">

                <Header />
                <div className="container-full">
                    <section className="content">
                        <h3 className="pb-10"><span>Your Investments</span> <span className="float-end"><a className="btn btn-xs btn-primary-light"  >View</a></span></h3>
                        <div className="row">

                            <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div className="box mb-15 pull-up hover-success">
                                    <div className="box-body">
                                        <div className=
                                            "d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <button type="button" className=
                                                    "waves-effect waves-light btn btn-rounded btn-dark mb-5">
                                                    Apple INC.</button>
                                            </div>
                                            <div>
                                                <div className=
                                                    "d-flex flex-column font-weight-500">
                                                    <a className=
                                                        "text-dark text-end hover-primary mb-1 fs-16">
                                                        AAPL</a> <span className=
                                                            "text-success">+0.66%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mt-10">
                                            <div className="col-6">
                                                <p className=
                                                    "text-muted fw-normal m-0 text-muted" title=
                                                    "Protfolio">Protfolio</p>
                                                <h3 className="m-0 fw-600">150000</h3>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div className="box mb-15 pull-up hover-success">
                                    <div className="box-body">
                                        <div className=
                                            "d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <button type="button" className=
                                                    "waves-effect waves-light btn btn-rounded btn-danger mb-5">
                                                    Nasdaq.Inc</button>
                                            </div>
                                            <div>
                                                <div className=
                                                    "d-flex flex-column font-weight-500">
                                                    <a className=
                                                        "text-dark text-end hover-primary mb-1 fs-16">
                                                        NDAQ</a> <span className=
                                                            "text-danger">-0.28%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mt-10">
                                            <div className="col-6">
                                                <p className=
                                                    "text-muted fw-normal m-0 text-muted" title=
                                                    "Protfolio">Protfolio</p>
                                                <h3 className="m-0 fw-600">15,120.20</h3>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end" style={{ position: "relative" }}>
                                                    <div id="new-leads-chart2" style={{ minHeight: 70 }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div className="box mb-15 pull-up hover-success">
                                    <div className="box-body">
                                        <div className=
                                            "d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <button type="button" className=
                                                    "waves-effect waves-light btn btn-rounded btn-info mb-5">
                                                    Tesla.Inc</button>
                                            </div>
                                            <div>
                                                <div className=
                                                    "d-flex flex-column font-weight-500">
                                                    <a className=
                                                        "text-dark text-end hover-primary mb-1 fs-16">
                                                        TSLA</a> <span className=
                                                            "text-success">+1.66%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mt-10">
                                            <div className="col-6">
                                                <p className=
                                                    "text-muted fw-normal m-0 text-muted" title=
                                                    "Protfolio">Protfolio</p>
                                                <h3 className="m-0 fw-600">10,225.40</h3>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end" style={{ position: "relative" }}>
                                                    <div id="new-leads-chart3" style={{ minHeight: 70 }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div className="box mb-15 pull-up hover-success">
                                    <div className="box-body">
                                        <div className=
                                            "d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <button type="button" className=
                                                    "waves-effect waves-light btn btn-rounded btn-warning mb-5">
                                                    amazon.Inc</button>
                                            </div>
                                            <div>
                                                <div className=
                                                    "d-flex flex-column font-weight-500">
                                                    <a className=
                                                        "text-dark text-end hover-primary mb-1 fs-16">
                                                        AMZN</a> <span className=
                                                            "text-success">+2.56%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mt-10">
                                            <div className="col-6">
                                                <p className=
                                                    "text-muted fw-normal m-0 text-muted" title=
                                                    "Protfolio">Protfolio</p>
                                                <h3 className="m-0 fw-600">40,500.20</h3>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end" style={{ position: "relative" }}>
                                                    <div id="new-leads-chart4" style={{ minHeight: 70 }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-8">
                                <h3 className="pb-10"><span>Stock Watchlists</span>
                                    <span className="float-end"><a className=
                                        "btn btn-xs btn-primary-light" >View</a></span></h3>
                                <div className="card chart_card2">
                                    <div className="card-body">
                                        <div className="mt-0">
                                            <h4 className="fw-500">S&amp;P 500</h4>
                                            <h3 className="fw-500">4,500.48 <span className=
                                                "badge badge-pill fs-10 badge-success-light">+1.66%</span></h3>
                                            <p className="text-fadet">Oct25, 5:26 pm UTC-5,
                                                INDEXSP Disclaimer</p>
                                        </div>
                                        <div className="p-0">
                                            <div className="box-controls pull-right mx-20">
                                                <ul className="nav nav-pills nav-pills-sm" role=
                                                    "tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link py-2 px-3 b-0"
                                                            data-bs-toggle="tab" ><span className="nav-text base-font">1d</span></a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link py-2 px-3 b-0"
                                                            data-bs-toggle="tab" ><span className="nav-text base-font">7d</span></a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link py-2 px-3 b-0 active"
                                                            data-bs-toggle="tab" ><span className="nav-text base-font">1m</span></a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link py-2 px-3 b-0"
                                                            data-bs-toggle="tab" ><span className="nav-text base-font">1y</span></a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link py-2 px-2 b-0"
                                                            data-bs-toggle="tab" ><span className="nav-text base-font mz-0">
                                                                Max</span></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div dir="ltr">
                                            <div className="mt-1 chartjs-chart" style={{ height: 320 }}>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <LineChart data={stockData}>
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <h3 className="pb-10"><span>Details</span> <span className=
                                    "float-end"><a className="btn btn-xs btn-primary-light"
                                    >View</a></span></h3>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h4 className="text-success ml-5 mb-1">S&amp;P
                                            500</h4>
                                        <ul className=
                                            "box-controls pull-right d-md-flex d-none">
                                            <li className="dropdown">
                                                <button className=
                                                    "btn btn-primary dropdown-toggle px-10"
                                                    data-bs-toggle="dropdown"  >24
                                                    h</button>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item" >Import</a> <a className="dropdown-item"
                                                    > Export</a> <a className=
                                                        "dropdown-item"  > Print</a>
                                                    <div className="dropdown-divider">
                                                    </div><a className="dropdown-item"  >
                                                        Settings</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="box-body p-0">
                                        <div className=
                                            "media-list media-list-hover media-list-divided">
                                            <a className="media media-single" ><span className="title text-mute">Previous
                                                Close</span> <span>4,500.50</span></a>
                                            <a className="media media-single" ><span className="title text-mute">Dry
                                                Range</span> <span>3,588-5,415</span></a>
                                            <a className="media media-single" ><span className="title text-mute">Year
                                                Range</span> <span>6,200-4,500</span></a>
                                            <a className="media media-single" h><span className="title text-mute">Market
                                                Cap</span> <span>$90.3T USD</span></a>
                                            <a className="media media-single" ><span className="title text-mute">Volume</span>
                                                <span>3,852,852</span></a> <a className=
                                                    "media media-single"  ><span className=
                                                        "title text-mute">PVE Ratio</span>
                                                <span>51.05</span></a> <a className=
                                                    "media media-single"  ><span className=
                                                        "title text-mute">Primary Exchange</span>
                                                <span>Index</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pull-up">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-6 d-flex align-items-center">
                                                <div className=
                                                    "bg-primary h-50 w-50 l-h-50 rounded text-center">
                                                    <p className="mb-0 fs-20 w-50 fw-600">M</p>
                                                </div>
                                                <div className=
                                                    "d-flex flex-column font-weight-500 mx-10">
                                                    <p className=
                                                        "text-fade hover-primary mb-1 fs-13">Market
                                                        Cap</p><span className=
                                                            "text-dark fs-19">$40</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end" style={{ position: "relative" }}>
                                                    <div id="campaign-sent-chart" style={{ minWidth: 70 }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-xl-8 col-lg-12">
                                                <div className="box">
                                                    <div className="box-body">
                                                        <div className=
                                                            "d-md-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h3 className="m-0">Funds in this
                                                                    category</h3>
                                                            </div>
                                                            <div className="mx-lg-5">
                                                                <a className=
                                                                    "waves-effect waves-light btn btn-outline btn-primary m-1 mx-lg-5">
                                                                    View All</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 fund_returns">
                                                        <div className=
                                                            "d-md-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h3 className="m-0 text-dark">This fund's
                                                                    returns : <span className=
                                                                        "text-success">+37.98%</span></h3>
                                                            </div>
                                                            <div className="mx-lg-5">
                                                                <a className=
                                                                    "waves-effect waves-light btn btn-outline btn-primary m-1 mx-lg-5">
                                                                    3 Years</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-body">
                                                        <div className="row mb-1">
                                                            <div className="row mb-3">
                                                                <div className=""  >
                                                                    <div className=
                                                                        "d-flex align-items-center mt-20">
                                                                        {/* <img className="avatar avatar-lg" src=
                                                                            "../../../images/avatar/21.jpg" alt=
                                                                            "..." style={{ marginTop: 8 }} /> */}
                                                                        <div className="mx-3">
                                                                            <h3>Digital Fund
                                                                                Direct-Growth.</h3>
                                                                            <div>
                                                                                <button className=
                                                                                    "btn btn-xs btn-light">Equity</button>
                                                                                <button className=
                                                                                    "btn btn-xs btn-light">Technology</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <p className="text-fade">Min.
                                                                        Investment</p>
                                                                    <h3>$100</h3>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className=
                                                                        "d-flex justify-content-between">
                                                                        <div>
                                                                            <p className="text-fade m-0">Category
                                                                                Returns</p>
                                                                            <div>
                                                                                29.60%
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "29%" }} aria-valuenow=
                                                                                        "75" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-end">
                                                                            <p className="text-fade">3Y Returns</p>
                                                                            <h3 className="text-success">
                                                                                +37.74%</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="box-body">
                                                        <div className="row">
                                                            <div className="row mb-3">
                                                                <div className=""  >
                                                                    <div className="d-flex align-items-center">
                                                                        {/* <img className="avatar avatar-lg" src=
                                                                            "../../../images/avatar/21.jpg" alt=
                                                                            "..." style={{ marginTop: 8 }} /> */}
                                                                        <div className="mx-3">
                                                                            <h3>Technology Fund
                                                                                Direct-Growth.</h3><button className=
                                                                                    "btn btn-xs btn-light">Equity</button>
                                                                            <button className=
                                                                                "btn btn-xs btn-light">Technology</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <p className="text-fade">Min.
                                                                        Investment</p>
                                                                    <h3>$500</h3>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className=
                                                                        "d-flex justify-content-between">
                                                                        <div>
                                                                            <p className="text-fade m-0">Category
                                                                                Returns</p>
                                                                            <div>
                                                                                40.60%
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: " 40%" }} aria-valuenow=
                                                                                        "75" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-end">
                                                                            <p className="text-fade">3Y Returns</p>
                                                                            <h3 className="text-success">
                                                                                +33.74%</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="box-body">
                                                        <div className="row">
                                                            <div className="row mb-3">
                                                                <div className=""  >
                                                                    <div className="d-flex align-items-center">
                                                                        {/* <img className="avatar avatar-lg" src=
                                                                            "../../../images/avatar/21.jpg" alt=
                                                                            "..." style={{ marginTop: 8 }} /> */}
                                                                        <div className="mx-3" />
                                                                        <h3>PHP Digital Fund
                                                                            Direct-Growth.</h3><button className=
                                                                                "btn btn-xs btn-light">Equity</button>
                                                                        <button className=
                                                                            "btn btn-xs btn-light">Technology</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <p className="text-fade">Min.
                                                                    Investment</p>
                                                                <h3>$500</h3>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div className=
                                                                    "d-flex justify-content-between">
                                                                    <div>
                                                                        <p className="text-fade m-0">Category
                                                                            Returns</p>
                                                                        <div>
                                                                            50.60%
                                                                            <div className=
                                                                                "progress progress-lg">
                                                                                <div className=
                                                                                    "progress-bar bg-success" role=
                                                                                    "progressbar" style={{ width: "50%" }} aria-valuenow=
                                                                                    "75" aria-valuemin="0"
                                                                                    aria-valuemax="100"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-end">
                                                                        <p className="text-fade">3Y Returns</p>
                                                                        <h3 className="text-success">
                                                                            +33.56%</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr />
                                                    <div className="box-body">
                                                        <div className="row">
                                                            <div className="row mb-3">
                                                                <div className=""  >
                                                                    <div className="d-flex align-items-center">
                                                                        {/* <img className="avatar avatar-lg" src=
                                                                            "../../../images/avatar/21.jpg" alt=
                                                                            "..." style={{ marginTop: 8 }} /> */}
                                                                        <div className="mx-3">
                                                                            <h3>Technology Fund
                                                                                Direct-Growth.</h3><button className=
                                                                                    "btn btn-xs btn-light">Equity</button>
                                                                            <button className=
                                                                                "btn btn-xs btn-light">Technology</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <p className="text-fade">Min.
                                                                        Investment</p>
                                                                    <h3>$300</h3>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className=
                                                                        "d-flex justify-content-between">
                                                                        <div>
                                                                            <p className="text-fade m-0">Category
                                                                                Returns</p>
                                                                            <div>
                                                                                89.60%
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "89%" }} aria-valuenow=
                                                                                        "75" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-end">
                                                                            <p className="text-fade">3Y Returns</p>
                                                                            <h3 className="text-success">
                                                                                +45.56%</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-12">
                                                <div className="box">
                                                    <div className="box-body">
                                                        <div className="row">
                                                            <div className="col-lg-12 col-sm-7 investment">
                                                                <h3>Investment Return</h3>
                                                                <table className="table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "94%" }} aria-valuenow=
                                                                                        "94.11" aria-valuemin="0"
                                                                                        aria-valuemax="100">
                                                                                    </div>94.11%
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-end text-success">
                                                                                +23.36%</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "9%" }} aria-valuenow=
                                                                                        "9.91" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>9.91%
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-end text-success">
                                                                                +48.51%</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "7.96%" }} aria-valuenow=
                                                                                        "7.96" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>7.96%
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-end text-success">
                                                                                +95.82%</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "6.40%" }} aria-valuenow=
                                                                                        "6.40" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>6.40%
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-end text-success">
                                                                                +162.90%</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className=
                                                                                    "progress progress-lg">
                                                                                    <div className=
                                                                                        "progress-bar bg-success" role=
                                                                                        "progressbar" style={{ width: "1.22%" }} aria-valuenow=
                                                                                        "1.22" aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>1.22%
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-end text-success">
                                                                                +327.123%</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="col-lg-12 col-sm-5 meter">
                                                                <h3>Scheme Riskometer</h3>
                                                                {/* <img src=
                                                                    "../../../images/meter.jpg" /> */}
                                                                <p className="text-fade">Investors understand
                                                                    that their principal will beat
                                                                    <span className="text-danger">very
                                                                        high</span> risk</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </div >
        </div>
    );
}
