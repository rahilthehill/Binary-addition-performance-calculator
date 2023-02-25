function addBinary(num1, num2) {
    // Algorithm One - Not optimized
    let carry = 0;
    let result = "";
    let i = num1.length - 1;
    let j = num2.length - 1;
    while (i >= 0 || j >= 0 || carry > 0) {
      let sum = carry;
      if (i >= 0) {
        sum += parseInt(num1[i]);
        i--;
      }
      if (j >= 0) {
        sum += parseInt(num2[j]);
        j--;
      }
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);
    }
    return result;
  }
  
  function addBinaryOptimized(num1, num2) {
    // Algorithm Two - Optimized using Boolean Algebra Laws
    let carry = 0;
    let result = "";
    // Pad the shorter binary number with leading zeros
    if (num1.length < num2.length) {
        num1 = "0".repeat(num2.length - num1.length) + num1;
    } else if (num2.length < num1.length) {
        num2 = "0".repeat(num1.length - num2.length) + num2;
    }
    for (let i = num1.length - 1; i >= 0; i--) {
        let sum = parseInt(num1[i]) ^ parseInt(num2[i]) ^ carry;
        result = sum + result;
        carry = (parseInt(num1[i]) & parseInt(num2[i])) | (parseInt(num1[i]) & carry) | (parseInt(num2[i]) & carry);
    }
    if (carry > 0) {
        result = carry + result;
    }
    return result;
}

  
function generateRandomBinary(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 2);
    }
    return result;
  }
  
  function runBenchmark() {
    let iterations = parseInt(document.getElementById("iterations").value);
    let result1, result2;
    let time1 = 0, time2 = 0;
    let table = "<table><thead><tr><th>Algorithm</th><th>Result</th><th>Time Elapsed (ms)</th></tr></thead><tbody>";
  
    for (let i = 0; i < iterations; i++) {
      let binary1 = generateRandomBinary(Math.floor(Math.random() * 100) + 1);
      let binary2 = generateRandomBinary(Math.floor(Math.random() * 100) + 1);
      
      let start1 = performance.now();
      result1 = addBinary(binary1, binary2);
      let end1 = performance.now();
      time1 += (end1 - start1);
  
      let start2 = performance.now();
      result2 = addBinaryOptimized(binary1, binary2);
      let end2 = performance.now();
      time2 += (end2 - start2);
  
      if ((i + 1) % 10 == 0 || i == iterations - 1) {
        time1 /= 10;
        time2 /= 10;
        table += "<tr><td>Average Time Elapsed - Not optimized</td><td></td><td>" + time1.toFixed(4) + "</td></tr>";
        table += "<tr><td>Average Time Elapsed - Optimized using Boolean Algebra Laws</td><td></td><td>" + time2.toFixed(4) + "</td></tr>";
        time1 = 0;
        time2 = 0;
      }
      
      table += "<tr><td>Iteration " + (i + 1) + "</td><td></td><td></td></tr>";
      table += "<tr><td>Algorithm One - Not optimized</td><td>" + result1 + "</td><td>" + (end1 - start1).toFixed(4) + "</td></tr>";
      table += "<tr><td>Algorithm Two - Optimized using Boolean Algebra Laws</td><td>" + result2 + "</td><td>" + (end2 - start2).toFixed(4) + "</td></tr>";
    }
  
    table += "</tbody></table>";
    document.getElementById("results").innerHTML = table;
  }
  
  
  
   


// In this code, we have two functions: `addBinary` for Algorithm One, which does binary addition using a simple one by one approach, and `addBinaryOptimized` for Algorithm Two, which uses boolean algebra laws to optimize the binary addition. 

// When the "Run Benchmark" button is clicked, the `runBenchmark` function is called, which takes the two binary numbers input by the user, runs them through both algorithms, and calculates the time elapsed for each algorithm using the `performance.now()` method. It then generates an HTML table that shows the results and time elapsed for both algorithms, and displays it in the "results" div on the page.

// Note that this code assumes that the two input binary numbers have the same number of digits. You may want to add some validation to check for this and handle errors appropriately.
