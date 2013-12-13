namespace WorldTest
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnGenerate = new System.Windows.Forms.Button();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.rbTopDown = new System.Windows.Forms.RadioButton();
            this.rbSide = new System.Windows.Forms.RadioButton();
            this.rbHRDiagram = new System.Windows.Forms.RadioButton();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // btnGenerate
            // 
            this.btnGenerate.Location = new System.Drawing.Point(12, 12);
            this.btnGenerate.Name = "btnGenerate";
            this.btnGenerate.Size = new System.Drawing.Size(75, 23);
            this.btnGenerate.TabIndex = 0;
            this.btnGenerate.Text = "Generate";
            this.btnGenerate.UseVisualStyleBackColor = true;
            this.btnGenerate.Click += new System.EventHandler(this.btnGenerate_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pictureBox1.Location = new System.Drawing.Point(12, 41);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(532, 498);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // rbTopDown
            // 
            this.rbTopDown.AutoSize = true;
            this.rbTopDown.Checked = true;
            this.rbTopDown.Location = new System.Drawing.Point(104, 15);
            this.rbTopDown.Name = "rbTopDown";
            this.rbTopDown.Size = new System.Drawing.Size(73, 17);
            this.rbTopDown.TabIndex = 2;
            this.rbTopDown.TabStop = true;
            this.rbTopDown.Text = "Top-down";
            this.rbTopDown.UseVisualStyleBackColor = true;
            this.rbTopDown.CheckedChanged += new System.EventHandler(this.ViewChanged);
            // 
            // rbSide
            // 
            this.rbSide.AutoSize = true;
            this.rbSide.Location = new System.Drawing.Point(183, 15);
            this.rbSide.Name = "rbSide";
            this.rbSide.Size = new System.Drawing.Size(46, 17);
            this.rbSide.TabIndex = 2;
            this.rbSide.TabStop = true;
            this.rbSide.Text = "Side";
            this.rbSide.UseVisualStyleBackColor = true;
            this.rbSide.CheckedChanged += new System.EventHandler(this.ViewChanged);
            // 
            // rbHRDiagram
            // 
            this.rbHRDiagram.AutoSize = true;
            this.rbHRDiagram.Location = new System.Drawing.Point(235, 15);
            this.rbHRDiagram.Name = "rbHRDiagram";
            this.rbHRDiagram.Size = new System.Drawing.Size(81, 17);
            this.rbHRDiagram.TabIndex = 2;
            this.rbHRDiagram.TabStop = true;
            this.rbHRDiagram.Text = "HR diagram";
            this.rbHRDiagram.UseVisualStyleBackColor = true;
            this.rbHRDiagram.CheckedChanged += new System.EventHandler(this.ViewChanged);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(556, 551);
            this.Controls.Add(this.rbHRDiagram);
            this.Controls.Add(this.rbSide);
            this.Controls.Add(this.rbTopDown);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.btnGenerate);
            this.Name = "Form1";
            this.Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnGenerate;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.RadioButton rbTopDown;
        private System.Windows.Forms.RadioButton rbSide;
        private System.Windows.Forms.RadioButton rbHRDiagram;
    }
}

