export const Button = (el) => {
    return <button
        type="button"
        className={`btn ${el.el.className}`}
        onClick={el.el.onclickHandler ? (e) => el.el.onclickHandler(e) : null}
        data-bs-toggle={el.el.modalData ? `${el.el.modalData.toggle}` : null}
        data-bs-target={el.el.modalData ? `#${el.el.modalData.target}` : null}
    >
        {el.el.iconName ? <ion-icon className={`${el.el.iconClassName ? el.el.iconClassName : null}`} name={`${el.el.iconName}-outline`}></ion-icon> : null}
        <span>{el.el.buttonName}</span>
    </button>
}