const calculateOutcomePercentage = (data) => {
    let totalOutcomes = data.length;
    let falseCount = 0;
    let trueCount = 0;
    let nullCount = 0;
    let trueOutcomes = [];
  
    data.forEach((item) => {
      const outcome = item.outcome;
  
      //console.log("Outcome:", outcome);
  
      if (outcome === null) {
        nullCount++;
      } else if (outcome === "") {
        nullCount++;
      } else if (
        outcome === "false" ||
        outcome === false ||
        outcome === "A no further action disposal"
      ) {
        falseCount++;
      } else {
        trueCount++;
        trueOutcomes.push(outcome);
      }
    });
  
    //console.log("Null Count:", nullCount);
    totalOutcomes = trueCount + falseCount + nullCount;
  
    const uniqueOutcomes = [...new Set(trueOutcomes)];
    const nonEmptyOutcomes = uniqueOutcomes.filter(
      (outcome) => outcome.trim() !== ""
    );
    const formattedOutcomes = nonEmptyOutcomes.join(", ");
  
    let truePercentage = (trueCount / totalOutcomes) * 100;
    let falsePercentage = (falseCount / totalOutcomes) * 100;
    let nullOutcomesPercentage = (nullCount / totalOutcomes) * 100;
  
    return (
      <div>
        <p>Total Outcomes: {totalOutcomes}</p>
        <p>
          Item Found: {trueCount} ({truePercentage.toFixed(2)}%)
        </p>
        <p>
          Suspect Cleared: {falseCount} ({falsePercentage.toFixed(2)}%)
        </p>
        <p>
          Null Outcomes: {nullCount} ({nullOutcomesPercentage.toFixed(2)}%)
        </p>
        <p>Results of found items: {formattedOutcomes}</p>
      </div>
    );
  };
  
  export default calculateOutcomePercentage;
  