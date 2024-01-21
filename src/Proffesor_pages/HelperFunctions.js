// function that takes the CurrentGrades.grades and calculates the average
export function calculateAverageGrade(grades) {
    if (grades.length === 0) {
      return 0;
    }

    const sum = grades.reduce((total, grade) => total + Number(grade.grade), 0);
    const average = sum / grades.length;

    return average;
  }
  // function that calculates the median
  export function calculateMedianGrade(grades) {
    if (grades.length === 0) {
      return 0;
    }

    const sortedGrades = grades.map((grade) => Number(grade.grade)).sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedGrades.length / 2);

    if (sortedGrades.length % 2 === 0) {
      const median = (sortedGrades[middleIndex - 1] + sortedGrades[middleIndex]) / 2;
      return median;
    } else {
      const median = sortedGrades[middleIndex];
      return median;
    }
  }

  // function that calculates the pass percentage
  export function calculatePassPercentage(grades) {
    if (grades.length === 0) {
      return 0;
    }

    const passedGrades = grades.filter((grade) => Number(grade.grade) >= 5);
    const passPercentage = (passedGrades.length / grades.length) * 100;

    return passPercentage;
  }
  // function that calculates the maximum grade
  export function calculateMaxGrade(grades) {
    if (grades.length === 0) {
      return 0;
    }

    const maxGrade = Math.max(...grades.map((grade) => Number(grade.grade)));
    return maxGrade;
  }
  // function that calculates the minimum grade
  export function calculateMinGrade(grades) {
    if (grades.length === 0) {
      return 0;
    }

    const minGrade = Math.min(...grades.map((grade) => Number(grade.grade)));
    return minGrade;
  }