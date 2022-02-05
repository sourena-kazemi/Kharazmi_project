let userData ={
	days : [
		{
			day:"saturday",
			index:0,
			lessons:[],
			exams:[]
		},{
			day:"sunday",
			index:1,
			lessons:[],
			exams:[]
		},{
			day:"monday",
			index:2,
			lessons:[],
			exams:[]
		},{
			day:"tuesday",
			index:3,
			lessons:[],
			exams:[]
		},{
			day:"wednesday",
			index:4,
			lessons:[],
			exams:[]
		},{
			day:"thursday",
			index:5,
			lessons:[],
			exams:[]
		},{
			day:"friday",
			index:6,
			lessons:[],
			exams:[]
		}
	],
	schools:[],
	chosenSchool:"all",//the school that user choose to see,by default sets on all the schools.
}
let dayName;
let dayIndex;
let isSchoolsDropdownShown = false;
let isScheduleAddingBoxShown = false;
let persianWeekDays = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه"];//days of week in persian.

$(document).ready(function(){ //jquery
	renderTodayLessonsList(userData.days);
	renderSchoolNamesList(userData.schools);
	renderSchoolScheduleList(userData.schools);
	$(".schedule_add_button,.nav_adding_schedule_btn,.footer_adding_schedule_btn,.schedule_adding_box").on("click", function(){
		isScheduleAddingBoxShown=true;
		$(".schedule_adding_box").fadeIn();
		$(".popout_box").fadeIn();
	});
	$(".popout_box").on("click", function(){
		$(".schedule_adding_box,.day_lessons_adding_box,.schools_dropdown,.week_schedule,.popout_box").fadeOut();
		isScheduleAddingBoxShown=false;
	});
	$(".schools_dropdown_btn").on("click", function(){
		isSchoolsDropdownShown = true;
		$(".schools_dropdown").fadeIn();
		$(".popout_box").fadeIn();
	});
	$(".schedule_adding_box").on("click",function(){

		if(isSchoolsDropdownShown){
			isSchoolsDropdownShown = false;
			return;
		}
		if(!isSchoolsDropdownShown){
			$(".schools_dropdown").fadeOut();
		}
	});
});
function openAddLessonsBox(element){
	let dayNameTitle = element.innerHTML; //What we show as day name title.
	let dayId = element.id;
	let DayLessonsBox = document.querySelector(".day_lessons_adding_box");
	let DayLessonsBoxTitle = document.querySelector(".day_lessons_box_title");
	let dayObject;

	DayLessonsBoxTitle.innerHTML = dayNameTitle;
	dayIndex = userData.days.findIndex(day => day.day===dayId);
	$(".day_container").on("click",function(){
		$(".day_lessons_adding_box").fadeIn();
	});
}
function addLesson(e){
	let lessonNameInput = document.querySelector(".lesson_name_input");
	let lessonStartTimeInput = document.querySelector(".lesson_time_start_input");
	let lessonEndTimeInput = document.querySelector(".lesson_time_end_input");
	let addLessonBtn = document.querySelector(".add_lesson_btn");

	if(lessonNameInput.value!== "" && lessonStartTimeInput.value!== "" && lessonEndTimeInput.value!== ""){
		if(userData.days[dayIndex].lessons.length>0){
		userData.days[dayIndex].lessons.map(lesson => {			//prevent user from add two same lesson.
			if(lesson.lesson !== lessonNameInput.value.trim() || lesson.timeStart !== lessonStartTimeInput.value || lesson.timeEnd !== lessonEndTimeInput.value){
				userData.days[dayIndex].lessons.push(
					{
						lesson: lessonNameInput.value.trim(),
						timeStart: lessonStartTimeInput.value,
						timeEnd: lessonEndTimeInput.value,
						school: userData.chosenSchool,
						checked: ""
					}
				);
				lessonNameInput.value = lessonStartTimeInput.value = lessonEndTimeInput.value = "";
				renderTodayLessonsList(userData.days);

				$(".day_lessons_adding_box").fadeOut();//hiding the box
			}else{
				addLessonBtn.classList.add("animate__shakeX");
				setTimeout(function(){
					addLessonBtn.classList.remove("animate__shakeX");
				},1000);
			}
		});}else{
			console.log("hello wol");
			userData.days[dayIndex].lessons.push(
				{
					lesson: lessonNameInput.value.trim(),
					timeStart: lessonStartTimeInput.value,
					timeEnd: lessonEndTimeInput.value,
					school: userData.chosenSchool,
					checked: ""
				}
			);
			lessonNameInput.value = lessonStartTimeInput.value = lessonEndTimeInput.value = "";
			renderTodayLessonsList(userData.days);

			$(".day_lessons_adding_box").fadeOut();//hiding the box
		}

	}else{
		addLessonBtn.classList.add("animate__shakeX");
		setTimeout(function(){
			addLessonBtn.classList.remove("animate__shakeX");
		},1000);
	}
}
function addSchool(){
	let schoolNameInput = document.querySelector(".school_name_input");
	let schoolName = schoolNameInput.value;
	let addSchoolNameBtn = document.querySelector(".add_school_name_btn");
	if(schoolName!=="" && !userData.schools.includes(schoolName.trim())){			//prevent user from add two same school

		schoolName.trim();
		userData.schools.push(schoolName);
		schoolNameInput.value="";
		schoolNameInput.focus();
		renderSchoolNamesList(userData.schools);//calling the function that render list of school in dropdown.
		renderSchoolScheduleList(userData.schools);
	}else{
		addSchoolNameBtn.classList.add("animate__shakeX");
		setTimeout(function(){
			addSchoolNameBtn.classList.remove("animate__shakeX");
		},1000);
	}
}
function renderSchoolNamesList(namesList){
	let schoolNamesDropdown = document.querySelector(".schools_dropdown_items");
	schoolNamesDropdown.innerHTML=`<p class=\"schools_dropdown_item all_schools_btn\" onclick=\"changeSelectedSchool(this)\">تمام مدارس</p>\n`;
	namesList.map((element)=>{
		schoolNamesDropdown.innerHTML += `<p class=\"schools_dropdown_item\" onclick=\"changeSelectedSchool(this)\">${element}</p>\n`;
	});
}
function changeSelectedSchool(element){
	let selectedSchoolName = element.innerHTML;
	let mainPageSchoolNameTitle = document.querySelector(".schools_dropdown_title");
	let addScheduleSchoolNameTitle = document.querySelector(".adding_box_dropdown_title");
	if(selectedSchoolName==="تمام مدارس"){
		userData.chosenSchool="all";
	}else{
		userData.chosenSchool=selectedSchoolName;
	}
	mainPageSchoolNameTitle.innerHTML = addScheduleSchoolNameTitle.innerHTML = selectedSchoolName;
	$(".schools_dropdown").fadeOut();
	if(!isScheduleAddingBoxShown){
		$(".popout_box").fadeOut();
	}
	renderTodayLessonsList(userData.days);
}
function renderTodayLessonsList(element){
	let todayIndex = getTodayIndex();
	let todayLessons = document.querySelector(".today_lessons_list");
	todayLessons.innerHTML="";
	element[todayIndex].lessons.map((lesson, index) =>{
		if(lesson.school === userData.chosenSchool || userData.chosenSchool==="all"){
			todayLessons.innerHTML+= `<label class=\"schedule_item\" for=\"checkbox${index}_today\"><input type=\"checkbox\" name=\"checkbox\" id=\"checkbox${index}_today\" ${lesson.checked} onclick=\"checkLesson(${index},${todayIndex})\">${lesson.lesson} ${lesson.timeStart} _ ${lesson.timeEnd}</label>\n`;
		}
	});
}
function checkLesson(lessonIndex,day){
	if(userData.days[day].lessons[lessonIndex].checked === ""){
		userData.days[day].lessons[lessonIndex].checked="checked";
	}else{
		userData.days[day].lessons[lessonIndex].checked="";
	}

}
function renderSchoolScheduleList(list){
	let schoolsSchedulesList = document.querySelector(".schools_schedules_list");
	schoolsSchedulesList.innerHTML="";
	list.map(school => {
		schoolsSchedulesList.innerHTML+=`<p class=\"school_schedule_btn\" onclick=\"openWeekScheduleBox(this)\">${school}</p>`;
	})
}
function openWeekScheduleBox(element){
	let schoolName = element.innerHTML;
	let scheduleBox = document.querySelector(".week_schedule");
	let schoolNameTitle = document.querySelector(".schedule_school_name_title");
	let dayNameTitle = document.querySelector(".day_name_title");
	let todayIndex = getTodayIndex();
	schoolNameTitle.innerHTML=schoolName;
	dayNameTitle.innerHTML=persianWeekDays[todayIndex];
	renderScheduleItems(todayIndex);
	$(".week_schedule").fadeIn();
	$(".popout_box").fadeIn();

}
function renderScheduleItems(dayIndex){
	let dayLessonsList = document.querySelector(".day_lessons_box");
	let schoolName = document.querySelector(".schedule_school_name_title").innerHTML;

	dayLessonsList.innerHTML="";
	userData.days[dayIndex].lessons.map(lesson => {
		if(lesson.school === schoolName || lesson.school === "all"){
			dayLessonsList.innerHTML+= `<div class=\"day_schedule_item\"><p class=\"day_schedule_item_text\">${lesson.lesson} ${lesson.timeStart} _ ${lesson.timeEnd}</p><img class=\"schedule_item_btn add_as_exam_btn\" src="assets/images/icons8-exam-49.png" alt="exam button" onclick=\"addLessonAsExam(this)\"></img><img class=\"schedule_item_btn remove_item_btn\" src="assets/images/icons8-close (1).svg" alt="remove button"></img></div>\n`;
		}
	})
}
function changeScheduleSelectedDay(input){
	let dayNameTitle = document.querySelector(".day_name_title");
	let dayIndex;
	dayIndex = persianWeekDays.indexOf(dayNameTitle.innerHTML);

	if(input === 'next'){
		dayIndex++;
		if(dayIndex > 6){
			dayIndex=0;
		}
	}else if(input === 'previous'){
		dayIndex--;
		if(dayIndex < 0){
			dayIndex=6;
		}
	}
	dayNameTitle.innerHTML=persianWeekDays[dayIndex];
	renderScheduleItems(dayIndex);
}
function addLessonAsExam(element){
	let parentElementOfBtn = element.parentElement;
	let info = parentElementOfBtn.firstChild.innerHTML.split(" ");
	console.log(info.split(" "));
}
function getTodayIndex(){
	//this function will return the index of day that you are in,We couldn't just use getDate() method because first day in my country is Saturday not Sunday!
	let date = new Date();
	let todayIndex = date.getDay();
	if(todayIndex===6){//this condition will change today index because getDay method will start week from sunday but in this project we start the week from saturday.
		todayIndex=0;
	}else if(todayIndex<=5){
		todayIndex+=1;
	}
	return todayIndex;
}