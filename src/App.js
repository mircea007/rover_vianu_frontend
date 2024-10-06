import logo from "./logo.svg";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { ReactComponent as ArrowUp } from './arrow-up.svg';
import { ReactComponent as ArrowDown } from './arrow-down.svg';
import { ReactComponent as ArrowLeft } from './arrow-left.svg';
import { ReactComponent as ArrowRight } from './arrow-right.svg';
import { ReactComponent as CloseBtn } from './close.svg';

import styles from './App.css';

//import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";

const axios = require("axios").default;

//const ip = "http://172.20.10.4:8080";
//const ip = "http://172.16.1.165:8080";
const ip = "http://192.168.29.34:8080"

function App() {

    //hover state bc why not bro ...

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.position = 'relative';
    document.body.style.height = '100vh';

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const html = {

        backgroundColor: 'red',
        position: 'relative',
        margin: '0',
        padding: '0',
        height: '100vh'

    }

    const controller = {

        position: 'fixed',
        bottom: '0',
        //right: '0',
        left: '0',
        paddingBottom: '10px',
        zIndex: '1000'

    }

    const controller2 = {

        position: 'fixed',
        bottom: '0',
        //right: 'right',
        right: '0',
        paddingBottom: '10px',
        zIndex: '1000'

    }

    const btnConsole = {

        //color: 'white',
        backgroundColor: 'white',
        transition: 'all .5s',
        opacity: isHover ? '1' : '0.5',
        borderRadius: '50%',
        borderColor: 'white',
        // padding: '1px 20px',
        //heigth: '50px',
        //width: '50px',
        padding: '0px',
        marginRigth: 'auto',
        marginLeft: 'auto'

    }

    const svgsize = {
        // width: '60px',
        // heigth: '60px',
        margin: '0px auto'
    }

    let cnt = 0;

    const [data, setData] = useState([]);
    const [add, setAdd] = useState(0);
    const [unghi, setUnghi] = useState(0);

    const [dataTemp, setDataTemp] = useState([]);
    const [dataPres, setDataPres] = useState([]);
    const [dataHum, setDataHum] = useState([]);

    const [dataInv, setDataInv] = useState([]);

    const randNum = () => {

        return Math.round(Math.random() * 1000 + 1);

    }

    // function dataParasite() {

    //     dataInv.push({
    //         name: `${add}`,
    //         "CH4": randNum(),
    //         "H2": randNum(),
    //         "NH3": randNum(),
    //         "Temperature": randNum(),
    //         "Pressure": randNum(),
    //         "Humidity": randNum()
    //     })

    //     console.log(dataInv)

    //     setDataInv(dataInv);

    //     setAdd(add => add + 1);

    // }

    function addResponseToData(response) {

        const response_string = JSON.parse(response).data;

        const words = response_string.split(/\s+/);

        let response_map = {};
        for (let i = words.indexOf('|') + 1; i < words.length; i += 3)
            response_map[words[i]] = words[i + 2];

        data.push({
            name: `${add}`,
            "CH4": response_map['mq4'],
            "H2": response_map['mq8'],
            "NH3": response_map['mq135']
        });
        setData(data);

        dataTemp.push({
            name: `${add}`,
            "Temperature": response_map['temperature']
        });
        setDataTemp(dataTemp);

        dataPres.push({
            name: `${add}`,
            "Pressure": response_map['pressure']
        });
        setDataPres(dataPres);

        dataHum.push({
            name: `${add}`,
            "Humidity": response_map['humidity']
        });
        setDataHum(dataHum);

        setAdd(add => add + 1);


    }

    function handleFront() {
        console.log("OP")
        axios.get(ip + "/move/fata").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });

        //dataParasite();
    }

    function handleBack() {
        axios.get(ip + "/move/spate").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });
    }

    function handleLeft() {
        axios.get(ip + "/move/stanga").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });
        if (unghi >= -1)
            setUnghi(unghi - 1);
    }
    function handleRight() {
        axios.get(ip + "/move/dreapta").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });
        if (unghi <= 1)
            setUnghi(unghi + 1);
    }
    function handleCenter() {
        axios.get(ip + "/move/centru").then(function (response) {
            console.log(response);
            addResponseToData(response);
        });
        setUnghi(0);
    }
    function handleOpen() {
        // console.log(data);
        axios.get(ip + "/gheara/open").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });
    }
    function handleClose() {
        axios.get(ip + "/gheara/close").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });
    }
    function handleFront_power() {
        axios.get(ip + "/move/fatatesla").then(function (response) {
            console.log(response);
            addResponseToData(response);

        });
    }
    function handleBack_power() {
        axios.get(ip + "/move/spatetesla").then(function (response) {
            console.log(response);
            addResponseToData(response);

        });
    }
    function dealFata() {
        axios.get(ip + "/move/dealfata").then(function (response) {
            console.log(response);
            addResponseToData(response);

        });
    }
    function dealSpate() {
        axios.get(ip + "/move/dealspate").then(function (response) {
            console.log(response);
            addResponseToData(response);

        });
    }

    return (
        <Container className="m-0">



            {/* //<title>My Leaflet Routing Machine Example</title> */}
            < link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
            <link rel="stylesheet" href="LeafletRoutingMachine/dist/leaflet-routing-machine.css" />
            <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
            <link rel="stylesheet" href="css/easy-button.css" />



            {/* <Row> */}
            <Container style={controller} className="w-25">
                <Row>
                    <Col xs={12} className="p-0" align='center'>
                        <Button style={btnConsole} onClick={handleFront} onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <ArrowUp style={svgsize} />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className="p-0" align='center'>
                        <Button style={btnConsole} onClick={handleLeft} className="btn-warning" onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <ArrowLeft style={svgsize} />
                        </Button>
                    </Col>

                    <Col xs={6} className="p-0" align='center'>
                        <Button style={btnConsole} className="btn-warning" onClick={handleRight} onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <ArrowRight style={svgsize} />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="p-0" align='center'>
                        <Button style={btnConsole} onClick={handleBack} onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <ArrowDown style={svgsize} />
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Container className="w-25" style={controller2}>
                <Row>

                    <Col xs={6} className="p-0 mt-5" align="left">
                        <Button style={btnConsole} onClick={handleOpen} onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <CloseBtn style={svgsize} />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className="p-0 mt-5" align="left">
                        <Button style={btnConsole} onClick={handleClose} onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <CloseBtn style={svgsize} />
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* <Col md={6} className="mt-5">
                    <Button onClick={handleFront_power} block>
                        FataTesla
                    </Button>
                </Col>
                <Col md={6} className="mt-5">
                    <Button onClick={handleBack_power} block>
                        SpateTesla
                    </Button>
                </Col> */}
            {/* <Col md={12}>
                    <h1>{unghi}</h1>
                </Col>
                <Col md={6} className="mt-5">
                    <Button onClick={dealFata} block>
                        FataDeal
                    </Button>
                </Col>
                <Col md={6} className="mt-5">
                    <Button onClick={dealSpate} block>
                        SpateDeal
                    </Button>
                </Col> */}
            {/* </Row> */}


            {/* // <ResponsiveContainer width="100%" height="100%"> */}
            <div style={{ width: '100%', height: 500 }}>
                <ResponsiveContainer>
                    <LineChart
                        key={add}
                        className="mt-5"
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}

                    >

                        <CartesianGrid className="da" strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="CH4" stroke="#8884d8" fill="#8884d8" />
                        <Line type="monotone" dataKey="H2" stroke="#82ca9d" fill="#8884d8" />
                        <Line type="monotone" dataKey="NH3" stroke="#ff0000" fill="#8884d8" />
                        <h1>{add}</h1>
                    </LineChart>
                </ResponsiveContainer>
                <h1>{add}</h1>

                {/* //</ResponsiveContainer> */}

            </div>

            <div style={{ width: '100%', height: 500 }}>
                <ResponsiveContainer>
                    <LineChart
                        key={add}
                        className="mt-5"
                        width={500}
                        height={500}
                        data={dataTemp}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}

                    >

                        <CartesianGrid className="da" strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Temperature" stroke="#8884d8" fill="#8884d8" />

                        <h1>{add}</h1>
                    </LineChart>
                </ResponsiveContainer>
                <h1>{add}</h1>

                {/* //</ResponsiveContainer> */}

            </div>

            <div style={{ width: '100%', height: 500 }}>
                <ResponsiveContainer>
                    <LineChart
                        key={add}
                        className="mt-5"
                        width={500}
                        height={500}
                        data={dataPres}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}

                    >

                        <CartesianGrid className="da" strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Pressure" stroke="#8884d8" fill="#8884d8" />

                        <h1>{add}</h1>
                    </LineChart>
                </ResponsiveContainer>
                <h1>{add}</h1>

                {/* //</ResponsiveContainer> */}

            </div>

            <div style={{ width: '100%', height: 500 }}>
                <ResponsiveContainer>
                    <LineChart
                        key={add}
                        className="mt-5"
                        width={500}
                        height={500}
                        data={dataHum}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}

                    >

                        <CartesianGrid className="da" strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Humidity" stroke="#8884d8" fill="#8884d8" />

                        <h1>{add}</h1>
                    </LineChart>
                </ResponsiveContainer>
                <h1>{add}</h1>

                {/* //</ResponsiveContainer> */}

            </div>

        </Container >

    );
}

export default App;
