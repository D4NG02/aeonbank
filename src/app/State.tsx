'use client'

import Navbar from "./components/Navbar"
import reducer, { state } from "./utils/Reducer/reducer"
import { StateProvider } from "./utils/Reducer/StateProvider"

const State = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return <StateProvider state={state} reducer={reducer}>
        <Navbar />
        {children}
    </StateProvider>
}

export default State