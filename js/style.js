let formNode = document.querySelector("form");
console.log(12212);
console.log('1212');
formNode.addEventListener("submit", event => {
    event.preventDefault(); //chặn sự kiện submit làm reset trang
    //clear table ( xóa dữ liệu trong tbody)
    document.querySelector("table tbody").innerHTML = "";
    //lấy dữ liệu
    const loan = Number(document.querySelector("#loan").value);
    const month = Number(document.querySelector("#month").value);
    const rate = Number(document.querySelector("#rate").value);
    const disbursementDate = document.querySelector("#disbusement-date").value;

    //tính lãi xuất (interest)
    const interest = Math.round((loan * month * rate) / 1200)
    //tổng lãi và gốc phải trả
    const originalAndInterest = loan + interest;
    //đỗ giá trị vào 2 ô input interest | originalAndInterest
    document.querySelector("#interest").value = interest.toLocaleString();
    document.querySelector("#originalAndInterest").value = originalAndInterest.toLocaleString();

    const period = [];//lưu danh sách các ngày cần phải trả tiền dựa trên ngày giải ngân, và số tháng cần trả
    for (let i = 0; i <= month; i++) {
        console.log(period[i - 1]);
        let html;
        if (i === 0) {
            html = `
            <td>${i}</td>
            <td>${handlePeriod(period, disbursementDate, i)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            `
        } else if (i === month) {
            //gốc hằng tháng
            const originalPerMonth = loan - Math.round(loan / month) * (month - 1)
            //lãi hằng tháng
            const interestPerMonth = interest - Math.round((loan * rate) / 1200) * (month - 1)
            //gốc và lãi hằng tháng
            const originalAndInteresPerMonth = originalPerMonth + interestPerMonth

            html = `
            <td>${i}</td>
            <td>${handlePeriod(period, period[i - 1], i)}</td>
            <td>${originalPerMonth.toLocaleString()}</td>
            <td>${interestPerMonth.toLocaleString()}</td>
            <td>${originalAndInteresPerMonth.toLocaleString()}</td>
            <td>0</td>
            `
        } else {
            //gốc hằng tháng
            const originalPerMonth = loan - Math.round(loan / month) * (month - 1)
            //lãi hằng tháng
            const interestPerMonth = interest - Math.round((loan * rate) / 1200) * (month - 1)
            //gốc và lãi hằng tháng
            const originalAndInteresPerMonth = originalPerMonth + interestPerMonth
            //số tiền còn lại phải trả
            const remainingOriginal = loan - originalPerMonth*i
            html = `
                <td>${i}</td>
                <td>${handlePeriod(period, period[i - 1], i)}</td>
                <td>${originalPerMonth.toLocaleString()}</td>
                <td>${interestPerMonth.toLocaleString()}</td>
                <td>${originalAndInteresPerMonth.toLocaleString()}</td>
                <td>${remainingOriginal.toLocaleString()}</td>
            `
        }
        const tr = document.createElement("tr")
        tr.innerHTML = html
        document.querySelector("table tbody").appendChild(tr)
    }
})

function handlePeriod(period, dateString, month) {
    if (month === 0) {
        const currentDate = new Date(dateString)
        let str = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        period.push(str)
    } else {
        const pre = new Date(dateString)
        console.log(pre);
        let month = pre.getMonth() + 2;
        year = pre.getFullYear();
        date = pre.getDate();
        if (month > 12) {
            month = 1;
            year += 1;
        }
        const currentDate = new Date(`${year}-${month}-${date}`)
        let str = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        period.push(str)
    }
    return period[month]
}