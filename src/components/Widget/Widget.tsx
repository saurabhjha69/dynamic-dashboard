import "./Widget.css";
import { useDispatch } from "react-redux";
import { startLoading, delWidget } from "../../redux/slice/slice";
import type { AppDispatch } from "../../redux/store/store";
type WidgetProps = {
    categoryId: string,
    data : {
        id: string,
        title: string;
        description: string;
        isActive: boolean;
    }
}
function Widget({data,categoryId}: WidgetProps) {
    const dispatch = useDispatch<AppDispatch>();
    const handleRemoveWidget = () => {
        const shouldBeDeleted = confirm("Do You Really Want to Delete?")
        if(shouldBeDeleted) {
            dispatch(startLoading())
            dispatch(delWidget({categoryId: categoryId, widgetId: data.id}))
        }
    }
    return (
        <div className="widget">
            <div className="content">
                <h5 className="widget__title">{data.title}</h5>
                <p className="widget__description">{data.description}</p>
            </div>
            <button className="widget__delete" onClick={handleRemoveWidget} >x</button>
        </div>
    )
}

export default Widget