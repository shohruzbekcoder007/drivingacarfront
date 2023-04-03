import React from 'react'
import TabsUnstyled from "@mui/base/TabsUnstyled"
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled"
import { Tab, TabsList } from "./styles"
import Container from '@mui/material/Container'
import Intoxication from './Intoxication'
import CarInTowTruck from './CarInTowTruck'

export default function Condition() {
    return (
        <Container>
            <TabsUnstyled defaultValue={0}>
                <TabsList>
                    <Tab>State of intoxication</Tab>
                    <Tab>Car is a tow truck</Tab>
                </TabsList>
                <TabPanelUnstyled value={0}>
                    <Intoxication/>
                </TabPanelUnstyled>
                <TabPanelUnstyled value={1}>
                    <CarInTowTruck/>
                </TabPanelUnstyled>
            </TabsUnstyled>
        </Container>
    )
}
