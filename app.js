const members = [
    { name: "정의석", position: "Forward", height: 180, skill: "중" },
    { name: "이태균", position: "Forward", height: 180, skill: "상" },
    { name: "한민규", position: "Forward", height: 180, skill: "중" },
    { name: "강치형", position: "Forward", height: 180, skill: "중" },
    { name: "신현진", position: "Forward", height: 180, skill: "중" },
    { name: "박동희", position: "Forward", height: 175, skill: "상" },
    { name: "박영진", position: "Guard", height: 170, skill: "중" },
    { name: "윤혜림", position: "Guard", height: 158, skill: "하" },
    { name: "전태환", position: "Guard", height: 170, skill: "하" },
    { name: "홍채환", position: "Forward", height: 180, skill: "상" },
    { name: "황승현", position: "Center", height: 190, skill: "중" },
    { name: "최현호", position: "Guard", height: 170, skill: "상" },
    { name: "백종훈", position: "Forward", height: 177, skill: "상" },
    { name: "김현호", position: "Center", height: 190, skill: "하" },
    { name: "이동화", position: "Guard", height: 180, skill: "상" },
    { name: "김종헌", position: "Center", height: 190, skill: "중" },
    { name: "임성상", position: "Forward", height: 180, skill: "모름" },
    { name: "정윤재", position: "Forward", height: 185, skill: "상" },
    { name: "김남진", position: "Guard", height: 175, skill: "상" },
    { name: "조희태", position: "Guard", height: 178, skill: "상" },
    { name: "육심권", position: "Guard", height: 165, skill: "중" },
    { name: "이재준", position: "Guard", height: 170, skill: "하" },
];


// 선수 명단
const players = [
    { name: "정의석", position: "Forward", height: 180, skill: "중" },
    { name: "이태균", position: "Forward", height: 180, skill: "상" },
    { name: "한민규", position: "Forward", height: 180, skill: "중" },
    { name: "강치형", position: "Forward", height: 180, skill: "중" },
    { name: "신현진", position: "Forward", height: 180, skill: "중" },
    { name: "박동희", position: "Forward", height: 175, skill: "상" },
    { name: "박영진", position: "Guard", height: 170, skill: "중" },
    { name: "윤혜림", position: "Guard", height: 158, skill: "하" },
    { name: "전태환", position: "Guard", height: 170, skill: "하" },
    { name: "홍채환", position: "Forward", height: 180, skill: "상" },
    { name: "황승현", position: "Center", height: 190, skill: "중" },
    { name: "최현호", position: "Guard", height: 170, skill: "상" },
    { name: "백종훈", position: "Forward", height: 177, skill: "상" },
    { name: "이재준", position: "Guard", height: 170, skill: "하" },
    { name: "이동화", position: "Guard", height: 180, skill: "상" },
    { name: "김종헌", position: "Center", height: 190, skill: "중" },
    { name: "임성상", position: "Forward", height: 180, skill: "모름" },
    { name: "정윤재", position: "Forward", height: 185, skill: "상" },
    { name: "김남진", position: "Guard", height: 170, skill: "상" },
    { name: "조희태", position: "Guard", height: 178, skill: "상" },
    { name: "육심권", position: "Guard", height: 165, skill: "중" }
];
/*
    우선순위
    1.팀원이 반드시 7명씩 구성되도록
    2.센터(Center)를 가능한 균등하게 분산
    3.가드와 포워드 숫자를 각 팀에서 균형 있게 분배
    4.키가 불균형이 없도록 균형 유지
    5.실력 분산
    6.랜덤 분배
 */

// 팀을 나누기 위한 로직
function divideIntoBalancedTeams(players) {
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  
    const centers = players.filter(player => player.position === "Center");
    const guards = players.filter(player => player.position === "Guard");
    const forwards = players.filter(player => player.position === "Forward");
  
    const shuffledCenters = shuffle(centers);
    const shuffledGuards = shuffle(guards);
    const shuffledForwards = shuffle(forwards);
  
    const teams = [[], [], []];
   // 균등 배치: 센터 먼저 팀에 균형 있게 분배
   centers.forEach((center, index) => {
    teams[index % 3].push(center);
  });

  // 균등 배치: 가드와 포워드를 팀 숫자 균형에 맞게 분배
  const distributePlayers = (playersList) => {
    playersList.forEach((player, index) => {
         if(index === playersList.length - 1){
            const minTeamIndex = [teams[0].length, teams[1].length, teams[2].length];
            const minIndex = minTeamIndex.indexOf(Math.min(...minTeamIndex));
            teams[minIndex].push(player);
         }else{
            teams[index % 3].push(player);
         }
    });
  };

  distributePlayers(guards);
  distributePlayers(forwards);

  
    // console.log("Before balancing: ", teams);
    swapMostAndLeastSkilledTeams(teams);
    // console.log("After swap logic: ", teams);
  
    return teams;
  }
  
  function getSkillValue(skill) {
    switch (skill) {
      case "상": return 3;
      case "중": return 2;
      case "하": return 1;
      case "모름": return 2;
      default: return 2;
    }
  }
  
  // 가장 높은 스킬 합계 팀과 가장 낮은 스킬 합계 팀 간 교환 로직
  function swapMostAndLeastSkilledTeams(teams) {
    const teamSkills = teams.map(team => ({
      team,
      totalSkill: team.reduce((sum, player) => sum + getSkillValue(player.skill), 0),
    }));
  
    // console.log("Team skill sums: ", teamSkills);
  
    const maxTeam = teamSkills.reduce((prev, teamData) => 
      prev.totalSkill > teamData.totalSkill ? prev : teamData
    );
  
    const minTeam = teamSkills.reduce((prev, teamData) => 
      prev.totalSkill < teamData.totalSkill ? prev : teamData
    );
  
    // console.log("Max Team: ", maxTeam);
    // console.log("Min Team: ", minTeam);
  
    const swapPlayersByPosition = (teamA, teamB) => {
      const positionGroupsA = {
        Guard: teamA.filter(player => player.position === "Guard" && getSkillValue(player.skill) === 3),
        Center: teamA.filter(player => player.position === "Center" && getSkillValue(player.skill) === 3),
        Forward: teamA.filter(player => player.position === "Forward" && getSkillValue(player.skill) === 3),
      };
  
      const positionGroupsB = {
        Guard: teamB.filter(player => player.position === "Guard" && getSkillValue(player.skill) === 1),
        Center: teamB.filter(player => player.position === "Center" && getSkillValue(player.skill) === 1),
        Forward: teamB.filter(player => player.position === "Forward" && getSkillValue(player.skill) === 1),
      };
  
      // Swap logic for valid position exchanges
      if (positionGroupsA.Guard.length && positionGroupsB.Guard.length) {
        const swapA = positionGroupsA.Guard[0];
        const swapB = positionGroupsB.Guard[0];
        teamA.splice(teamA.indexOf(swapA), 1);
        teamB.splice(teamB.indexOf(swapB), 1);
  
        teamA.push(swapB);
        teamB.push(swapA);
  
        // console.log("Swapped Guards");
      }
  
      if (positionGroupsA.Center.length && positionGroupsB.Center.length) {
        const swapA = positionGroupsA.Center[0];
        const swapB = positionGroupsB.Center[0];
        teamA.splice(teamA.indexOf(swapA), 1);
        teamB.splice(teamB.indexOf(swapB), 1);
  
        teamA.push(swapB);
        teamB.push(swapA);
  
        // console.log("Swapped Centers");
      }
  
      if (positionGroupsA.Forward.length && positionGroupsB.Forward.length) {
        const swapA = positionGroupsA.Forward[0];
        const swapB = positionGroupsB.Forward[0];
        teamA.splice(teamA.indexOf(swapA), 1);
        teamB.splice(teamB.indexOf(swapB), 1);
  
        teamA.push(swapB);
        teamB.push(swapA);
  
        // console.log("Swapped Forwards");
      }
    };
  
    swapPlayersByPosition(maxTeam.team, minTeam.team);
  }
  // 출력 전에 팀을 센터 > 포워드 > 가드 순으로 정렬
function reorderTeams(teams) {
    return teams.map(team => sortPlayersByPosition(team));
}
// 팀원을 재정렬하는 함수
function sortPlayersByPosition(players) {
    return players.sort((a, b) => {
        const order = { "Center": 1, "Forward": 2, "Guard": 3 };
        return order[a.position] - order[b.position];
    });
}


const teams = divideIntoBalancedTeams(players);
const reorderedTeams = reorderTeams(teams);
console.log("========================================");
console.log("Teams Summary (By Columns):");
console.log("========================================");

// 최대 팀원 수 계산
const maxPlayers = Math.max(...reorderedTeams.map(team => team.length));

// 컬럼 폭 설정
const columnWidth = 40;

// 헤더 출력
const teamHeaders = ["Team A", "Team B", "Team C"];
console.log(teamHeaders.map(header => header.padEnd(columnWidth + 4)).join(""));

// 데이터를 행렬 형태로 정렬
const table = [];
for (let i = 0; i < maxPlayers; i++) {
    table.push(reorderedTeams.map(team => {
        const player = team[i];
        return player
            ? `${player.name} (${player.position}, ${player.height}cm, ${player.skill})`.padEnd(columnWidth)
            : "".padEnd(columnWidth);
    }));
}

// 각 팀의 총합 데이터 추가
table.push(reorderedTeams.map((_, idx) =>
    `Total Height: ${reorderedTeams[idx].reduce((sum, p) => sum + p.height, 0)}, Total Skill: ${reorderedTeams[idx].reduce((sum, p) => sum + (p.skill === "상" ? 3 : p.skill === "중" ? 2 : p.skill === "하" ? 1 : 0), 0)}`.padEnd(columnWidth + 4)
));

// 구분선 추가
table.push(reorderedTeams.map(() =>
    "-".repeat(columnWidth).padEnd(columnWidth)
));

// 최종 출력
table.forEach(row => console.log(row.join("")));