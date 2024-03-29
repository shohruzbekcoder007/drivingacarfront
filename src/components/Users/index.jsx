import * as React from "react"
import TabsUnstyled from "@mui/base/TabsUnstyled"
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled"
import { Tab, TabsList } from "./styles"
import Container from '@mui/material/Container'
import Ordinary from "./Ordinary"
import TowTruck from "./TowTruck"

export default function PublicLoginTabs() {
    return (
        <Container>
            <TabsUnstyled defaultValue={0}>
                <TabsList>
                    <Tab>Ordinary users</Tab>
                    <Tab>Tow truck</Tab>
                </TabsList>
                <TabPanelUnstyled value={0}>
                    <Ordinary/>
                </TabPanelUnstyled>
                <TabPanelUnstyled value={1}>
                    <TowTruck/>
                </TabPanelUnstyled>
            </TabsUnstyled>
        </Container>

    );
}