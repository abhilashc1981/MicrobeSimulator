// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, arrayOf15DNABases) => {
  const pAequor = {
    specimenNum: number,
    dna: arrayOf15DNABases,

    mutate() {
      const indexToMutate = Math.floor(Math.random() * this.dna.length);
      const dnaBases = [];
      switch(this.dna[indexToMutate]) {
        case 'A':
          dnaBases = ['T', 'C', 'G'];
          this.dna[indexToMutate] = dnaBases[Math.floor(math.random() * dnaBases.length)];
          break;
        case 'T':
          dnaBases = ['A', 'C', 'G'];
          this.dna[indexToMutate] = dnaBases[Math.floor(math.random() * dnaBases.length)];
          break;
        case 'C':
          dnaBases = ['A', 'T', 'G'];
          this.dna[indexToMutate] = dnaBases[Math.floor(math.random() * dnaBases.length)];
          break;
        case 'G':
          dnaBases = ['A', 'T', 'C'];
          this.dna[indexToMutate] = dnaBases[Math.floor(math.random() * dnaBases.length)];
          break;
      }
      return this.dna;
    },

    compareDNA(anotherPAequor) {
      let identicalBases = 0;
      for (let i = 0; i < anotherPAequor.dna.length; i++) {
        if (this.dna[i] === anotherPAequor.dna[i]) {
          identicalBases++;
        }
      }
      const percentCommonDNA = Math.round((identicalBases / 15) * 100);
      console.log(`${percentCommonDNA}%                    speciment #${this.specimenNum} and specimen #${anotherPAequor.specimenNum}`);
      return percentCommonDNA;
    },

    willLikelySurvive() {
      let numberCOrG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          numberCOrG++;
        }
      }
      const percentCOrG = (numberCOrG / 15) * 100;
      if (percentCOrG >= 60) {
        return true;
      }
      else {
        return false;
      }
    },

    complementStrand() {
      let complementaryDNA = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            complementaryDNA.push('T');
            break;
          case 'T':
            complementaryDNA.push('A');
            break;
          case 'C':
            complementaryDNA.push('G');
            break;
          case 'G':
            complementaryDNA.push('C');
            break;
        }
      }
      return complementaryDNA;
    },
  }

  return pAequor;
}

let viablePAequors = [];
let numberOfViablePAeqours = 0;

do {
  let currentPAequor = pAequorFactory(Date.now() + Math.random(), mockUpStrand());
  if (currentPAequor.willLikelySurvive()) {
    viablePAequors.push(currentPAequor);
    numberOfViablePAeqours++;
  }
} while (numberOfViablePAeqours < 30)

/*for (let i = 0; i < viablePAequors.length; i++) {
  console.log(viablePAequors[i].complementStrand());
}
console.log(viablePAequors);*/

for (let i = 0; i < viablePAequors.length; i++) {
  for (let j = 0; j < viablePAequors.length; j++) {
    if (i !== j) {
      viablePAequors[i].compareDNA(viablePAequors[j]);
    }
  }
}


