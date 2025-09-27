import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

type Widget = {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
}

type Category = {
    id: string;
    name: string;
    widgets: Widget[]

}
type DataType = Category[]

type ReduxState = {
    data: DataType
    status: string,
    error: string | null 
} 

const initialState : ReduxState = {
    data: [],
    status: "idle",
    error: null
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.status = "loading";
        },
        setFailed: (state) => {
            state.status = "failed";
        },
        setError: (state,action : PayloadAction<{error: string}>) => {
            state.error = action.payload.error;
        },
        setData: (state,action : PayloadAction<DataType>) => {
            state.data = action.payload
            state.status = "succeeded"
        },
        addWidget: (state, action : PayloadAction<{categoryId : string, widgetTitle: string, widgetDescription : string}>) => {
            const {categoryId, widgetTitle,widgetDescription} = action.payload
            const category = state.data.find(cat => cat.id === categoryId);
            if(category) {
                category.widgets.push({
                    id: `widget-${nanoid()}-${Date.now()}`,
                    title: widgetTitle,
                    description: widgetDescription,
                    isActive: true
                });
            }
            state.status = "succeeded"
        },
        delWidget: (state, action : PayloadAction<{categoryId : string, widgetId: string}>) => {
            const {categoryId, widgetId} = action.payload
            const category = state.data.find(cat => cat.id === categoryId);
            if(category) {
                category.widgets = category.widgets.filter(wid => wid.id !== widgetId);
            }
            state.status = "succeeded"
        },
        toggleWidget: (state,action : PayloadAction<{categoryId : string, widgetId: string}>) => {
            const {categoryId, widgetId} = action.payload
            const category = state.data.find(cat => cat.id === categoryId);
            if(category) {
                const widget = category.widgets.find(wid => wid.id === widgetId)
                if(widget) {
                    widget.isActive = !widget.isActive
                }
            }
            state.status = "succeeded"
        }
    }
})

export const {addWidget,setError, setFailed,delWidget, toggleWidget, setData,startLoading} = dashboardSlice.actions;
export default dashboardSlice.reducer;
