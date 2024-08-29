import logo from "./logo.svg";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
//import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
const axios = require("axios").default;
//const ip = "http://172.20.10.4:8080";
const ip = "http://192.168.176.34:8080";

function App() {
    let cnt = 0;
    const [data, setData] = useState([]);
    const [add, setAdd] = useState(0);
    const [unghi, setUnghi] = useState(0);
    function addResponseToData(response) {
        let start = response.indexOf("mq8 = ");
        start += 7;
        let number = 0;
        while (response[start] >= '0' && response[start] <= '9') {
            number = number * 10 + response[start] - '0';
            start++;
        }
        let mq8 = number;

        // 
        start = response.indexOf("mq4 = ");
        start += 7;
        number = 0;
        while (response[start] >= '0' && response[start] <= '9') {
            number = number * 10 + response[start] - '0';
            start++;
        }
        let mq4 = number;



        data.push({ name: `${add}`, uv: mq4, pv: mq8 });

        setData(data);

        setAdd(add => add + 1);

        console.log(data);
    }
    function handleFront() {
        //console.log("OP")
        axios.get(ip + "/move/fata").then(function (response) {
            console.log(response);
            addResponseToData(JSON.stringify(response));
        });
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
        console.log(data);
        axios.get(ip + "/gheara/open").then(function (response) {
            console.log(response);
            addResponseToData(response);
        });
    }
    function handleClose() {
        axios.get(ip + "/gheara/close").then(function (response) {
            console.log(response);
            addResponseToData(response);
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

    const Data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <Container className="mt-5">



            {/* //<title>My Leaflet Routing Machine Example</title> */}
            <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
            <link rel="stylesheet" href="LeafletRoutingMachine/dist/leaflet-routing-machine.css" />
            <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
            <link rel="stylesheet" href="css/easy-button.css" />


            <Row>
                <Col md={12} style={{ width: "100%" }} className="mb-3">
                    <Button block onClick={handleFront}>
                        {" "}
                        Sus{" "}
                    </Button>
                </Col>
                <Col md={4} className="mb-3">
                    <Button block onClick={handleLeft} className="btn-warning">
                        Stanga{" "}
                    </Button>
                </Col>
                <Col md={4} className="mb-3">
                    <Button block onClick={handleCenter} className="btn-danger">
                        Centru{" "}
                    </Button>
                </Col>
                <Col md={4} className="mb-3">
                    <Button block className="btn-warning" onClick={handleRight}>
                        Dreapta
                    </Button>
                </Col>
                <Col md={12} className="mb-5">
                    <Button block onClick={handleBack}>
                        Jos
                    </Button>
                </Col>
                <Col md={6} className="mt-5">
                    <Button onClick={handleOpen} block>
                        Open
                    </Button>
                </Col>
                <Col md={6} className="mt-5">
                    <Button onClick={handleClose} block>
                        Close
                    </Button>
                </Col>

                <Col md={6} className="mt-5">
                    <Button onClick={handleFront_power} block>
                        FataTesla
                    </Button>
                </Col>
                <Col md={6} className="mt-5">
                    <Button onClick={handleBack_power} block>
                        SpateTesla
                    </Button>
                </Col>
                <Col md={12}>
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
                </Col>
            </Row>


            {/* // <ResponsiveContainer width="100%" height="100%"> */}
            <>
                <LineChart
                    key={add}
                    className="mt-5"
                    width={1000}
                    height={600}
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
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    <h1>{add}</h1>
                </LineChart>

                <h1>{add}</h1>

                {/* //</ResponsiveContainer> */}

            </>

        </Container>

    );
}

export default App;
