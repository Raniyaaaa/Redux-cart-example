import classes from "./Notification.module.css"

const Notification=(props)=>{
    let SpecialClasses="";

    if(props.status === 'error'){
        SpecialClasses=classes.error; 
    }
    if(props.status === 'success'){
        SpecialClasses=classes.success;
    }
    if(props.status === 'pending'){
        SpecialClasses=classes.pending;
    }

    const cssClasses = `${classes.Notification} ${SpecialClasses}`;

    return(
        <section className={cssClasses}>
            <h2 style={{fontWeight:'bold',paddingTop:'1rem',marginLeft:'1rem'}}>{props.title}</h2>
            <p style={{paddingTop:'1rem',fontWeight:'bold',marginRight:'1rem'}}>{props.message}</p>
        </section>
    )
}

export default Notification;