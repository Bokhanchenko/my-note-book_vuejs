<template>
  <div class="wrapper">
    <label>
      Start Num:
      <input type="text" v-model="startNum">
    </label>
    <span>Result: {{ result }}</span>
    <hr>
    <label>
      Start Num2:
      <input type="text" v-model="startNum2">
    </label>
    <span>Result2: {{ result2 }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        startNum: 5,
        startNum2: 5,
      }
    },
    computed: {
      result() {
        const equation =  new Plus(
          new Multiply(
            new Variable(),
            new Variable()
          ),
          new Multiply(
            new Constant(2),
            new Variable()
          ),
          new Constant(1)
        );

        return equation.evaluate(this.startNum)
      },
      result2() {
        const equation =  new Plus(
          new Multiply(
            new Variable2('x'),
            new Variable2('y')
          ),
          new Multiply(
            new Constant(2),
            new Variable2('x')
          ),
          new Constant(1)
        );

        return equation.evaluate({ x: this.startNum2, y: 2 })
      }
    },
    methods: {}
  }

  // x * x + 2 * x + 1

  //  const equation = new Plus(
  //    new Multiply(
  //      new Variable('x'),
  //      new Variable('y')
  //    ),
  //    new Multiply(
  //      new Constant(2),
  //      new Variable('x')
  //    ),
  //    new Constant(1)
  //  );

  //  console.log(equation.evaluate({ x: 1, y: 2 })); // 5 * 5 + 2 * 5 + 1 = 36-->

  class Evaluable {
    constructor (...operands) {
      this.operands = operands
    }

    evaluate(value) {
      const [firstOperand, ...operands] = this.operands;

      return operands.reduce((result, operand) => this.compute(
        result,
        operand.evaluate(value)
      ), firstOperand.evaluate(value))
    }

    compute () {
      throw new Error('You must implement "compute" method')
    }
  }

  class Plus extends Evaluable {
    compute (a, b) {
      return a + b
    }
  }

  class Multiply extends Evaluable {
    compute (a, b) {
      return a * b
    }
  }

  class Constant extends Evaluable {
    evaluate () {
      return this.operands[0];
    }
  }

  class Variable extends Evaluable {
    evaluate (value) {
      return value
    }
  }

  class Variable2 {
    constructor(name) {
      this.name = name
    }

    evaluate (params) {
      return params[this.name]
    }
  }

</script>

<style scoped>

</style>
