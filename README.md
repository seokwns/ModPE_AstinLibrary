# seize_ModPE_Library
ModPE Library

this library helps you to use material design and minecraft UI(include minecraft font).
Also, it includes a lot of ModPE functions and Math, Array, String, Vector, Entity Objects.


(example)

var newLevel = () => {
  new pe.seize.widget.Button()
  .setText("Button")
  .setOnClickListener(() => {
    Utils.Toast("click listener");
  })
  .setParams(75 * Utils.DP, 45 * Utils.DP)
  .show(android.view.Gravity.CENTER, 0, 0):
};
//create a material design button.
