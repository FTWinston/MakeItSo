using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace UnitTests
{
    class Tests
    {
        static void Main(string[] args)
        {
            var empty = new ParameterInfo[0];
            foreach (Type t in typeof(Tests).Assembly.GetTypes())
            {
                var methodInfo = t.GetMethods(BindingFlags.Static | BindingFlags.Public)
                    .Where(m => m.ReturnType == typeof(bool) && m.GetParameters().Length == 0)
                    .ToList();

                if (methodInfo.Count == 0)
                    continue;

                TestResult(t.Name, methodInfo);
            }

            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }

        delegate bool testFunc();

        static void TestResult(string name, IList<MethodInfo> tests)
        {
            Console.WriteLine(name);
            int failures = 0;

            for (int i = 0; i < tests.Count; i++)
            {
                MethodInfo mi = tests[i];
                Console.Write("  ");
                Console.Write(i + 1);
                Console.Write("/");
                Console.Write(tests.Count);
                Console.Write(" ");
                Console.Write(mi.Name);
                Console.Write(" ... ");

                if ((bool)mi.Invoke(null, null))
                    Console.WriteLine("passed");
                else
                {
                    Console.WriteLine("FAILED");
                    failures++;
                }
            }

            if (failures == 0)
                Console.WriteLine(name + " passed all tests");
            else
            {
                Console.Error.Write(name);
                Console.Error.Write(" failed ");
                Console.Error.Write(failures);
                Console.Error.Write("/");
                Console.Error.Write(tests.Count);
                Console.Error.WriteLine(" tests");
            }
            Console.WriteLine();
        }
    }
}
