const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        {sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
        {sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}
    ],
    changeStudents: function(sectionNumber, change){
        let targetIndex = this.sections.findIndex((section) => section.sectionNum == sectionNumber);
        if(targetIndex != -1){
            this.sections[targetIndex].enrolled += change;
            renderSections(this.sections);
        }
    }
}

const setCourse = function(course){
    document.querySelector("#courseName").innerHTML = course.name;
    document.querySelector("#courseCode").innerHTML = course.code;
}

const renderSections = function(sections){
    const html = sections.map(
        (section) => `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
        </tr>`
    );
    document.querySelector("#sections").innerHTML = html.join("")
}

document.querySelector("#enrollStudent").addEventListener("click", (e) => {
    let sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.changeStudents(sectionNum, 1);
});

document.querySelector("#dropStudent").addEventListener("click", (e) => {
    let sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.changeStudents(sectionNum, -1);
});

setCourse(aCourse);
renderSections(aCourse.sections);